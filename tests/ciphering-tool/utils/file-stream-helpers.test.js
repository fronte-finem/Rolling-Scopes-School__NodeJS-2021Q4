import fs from 'fs';
import {
  FileError,
  FileErrorNotExists,
  FileErrorNotFile,
} from '../../../ciphering-tool/errors/file-error.js';
import { FileStreamHelper } from '../../../ciphering-tool/utils/file-stream-helpers.js';
import { StreamError } from '../../../ciphering-tool/errors/stream-error.js';

jest.mock('fs', () => {
  const { constants } = jest.requireActual('fs');

  const getChunkArgs = (str) => [str.length, Buffer.from(str)];

  const TEST_FILE_DESCRIPTOR = 42;
  const TEST_READ_CHUNK = 'Read';
  const TEST_WRITE_CHUNK = 'Write';

  const mockedOpen = (filename, flags, callback) =>
    callback(null, TEST_FILE_DESCRIPTOR);
  const mockedClose = (fd, callback) => callback();
  const mockedRead = (fd, buffer, offset, length, position, callback) =>
    callback(null, ...getChunkArgs('Read'));
  const mockedWrite = (fd, buffer, callback) =>
    callback(null, ...getChunkArgs('Write'));

  return {
    TEST_FILE_DESCRIPTOR,
    TEST_READ_CHUNK,
    TEST_WRITE_CHUNK,
    constants,
    existsSync: jest.fn().mockReturnValue(true),
    statSync: jest.fn().mockReturnValue({ isFile: () => true }),
    open: jest.fn().mockImplementation(mockedOpen),
    close: jest.fn().mockImplementation(mockedClose),
    read: jest.fn().mockImplementation(mockedRead),
    write: jest.fn().mockImplementation(mockedWrite),
  };
});

describe('FileStreamHelper:', () => {
  const filename = 'file.txt';
  const stream = {
    destroy: jest.fn(),
    push: jest.fn(),
  };
  const inputOptions = { filename, stream };
  const outputOptions = { filename, stream, isInput: false };

  beforeEach(() => {
    fs.existsSync.mockClear();
    fs.statSync.mockClear();
    fs.open.mockClear();
    fs.close.mockClear();
    fs.read.mockClear();
    fs.write.mockClear();
    stream.destroy.mockClear();
    stream.push.mockClear();
  });

  it('should throw FileErrorNotExists if file dont exist', () => {
    fs.existsSync.mockReturnValueOnce(false);
    expect(() => new FileStreamHelper(inputOptions)).toThrow(
      FileErrorNotExists
    );
    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.statSync).toHaveBeenCalledTimes(0);
  });

  it('should throw FileErrorNotFile if path is not a file', () => {
    fs.statSync.mockReturnValueOnce({ isFile: () => false });
    expect(
      () => new FileStreamHelper({ filename: './directory/', stream: null })
    ).toThrow(FileErrorNotFile);
    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.statSync).toHaveBeenCalledTimes(1);
  });

  it('should set READONLY flag if options isInput = true or unset', () => {
    const helper = new FileStreamHelper(inputOptions);
    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.statSync).toHaveBeenCalledTimes(1);
    expect(helper.filename).toEqual(filename);
    expect(helper.flags).toEqual(fs.constants.O_RDONLY);
  });

  it('should set APPEND flag if options isInput = false', () => {
    const helper = new FileStreamHelper(outputOptions);
    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.statSync).toHaveBeenCalledTimes(1);
    expect(helper.filename).toEqual(filename);
    expect(helper.flags).toEqual(fs.constants.O_APPEND);
  });

  it('open should pass FileError to callback if fs-error occurs', () => {
    fs.open.mockImplementationOnce((...[, , callback]) =>
      callback(new Error())
    );
    const helper = new FileStreamHelper(inputOptions);
    const callback = jest.fn();
    helper.open(callback);
    expect(fs.open).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0]).toBeInstanceOf(FileError);
  });

  it('should open file with calling fs.open and save file descriptor', () => {
    const helper = new FileStreamHelper(inputOptions);
    const callback = jest.fn();
    helper.open(callback);
    expect(fs.open).toHaveBeenCalledTimes(1);
    expect(helper.fileDescriptor).toEqual(fs.TEST_FILE_DESCRIPTOR);
  });

  it('close file should pass StreamError to callback if error passed to it', () => {
    const helper = new FileStreamHelper(inputOptions);
    helper.open(() => {});
    const callback = jest.fn();
    helper.close(new Error(), callback);
    expect(fs.open).toHaveBeenCalledTimes(1);
    expect(fs.close).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0]).toBeInstanceOf(StreamError);
  });

  it('close should pass FileError to callback if fs-error occurs', () => {
    fs.close.mockImplementationOnce((...[, callback]) => callback(new Error()));
    const helper = new FileStreamHelper(inputOptions);
    helper.open(() => {});
    const callback = jest.fn();
    helper.close(null, callback);
    expect(fs.open).toHaveBeenCalledTimes(1);
    expect(fs.close).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0]).toBeInstanceOf(FileError);
  });

  it('should close file with calling fs.close', () => {
    const helper = new FileStreamHelper(inputOptions);
    helper.open(() => {});
    const callback = jest.fn();
    helper.close(null, callback);
    expect(fs.open).toHaveBeenCalledTimes(1);
    expect(fs.close).toHaveBeenCalledTimes(1);
    expect(fs.close.mock.calls[0][0]).toEqual(fs.TEST_FILE_DESCRIPTOR);
  });

  it('should read chunk to stream.push with calling fs.read', async () => {
    const helper = new FileStreamHelper(inputOptions);
    expect(helper.filename).toEqual(filename);
    helper.open(() => {});
    helper.read(5);
    expect(fs.open).toHaveBeenCalledTimes(1);
    expect(fs.read).toHaveBeenCalledTimes(1);
    expect(fs.read.mock.calls[0][0]).toEqual(fs.TEST_FILE_DESCRIPTOR);
    expect(stream.push).toHaveBeenCalledTimes(1);
    expect(stream.push.mock.calls[0][0]).toBeInstanceOf(Buffer);
  });

  it('should read null to stream.push if chunk empty', async () => {
    fs.read.mockImplementationOnce((...[, , , , , callback]) =>
      callback(null, 0)
    );
    const helper = new FileStreamHelper(inputOptions);
    expect(helper.filename).toEqual(filename);
    helper.read(5);
    expect(fs.read).toHaveBeenCalledTimes(1);
    expect(stream.push).toHaveBeenCalledTimes(1);
    expect(stream.push.mock.calls[0][0]).toBeNull();
  });

  it('read should pass FileError to stream.destroy if error occurs', async () => {
    fs.read.mockImplementationOnce((...[, , , , , callback]) =>
      callback(new Error())
    );
    const helper = new FileStreamHelper(inputOptions);
    expect(helper.filename).toEqual(filename);
    helper.open(() => {});
    helper.read(5);
    expect(fs.open).toHaveBeenCalledTimes(1);
    expect(fs.read).toHaveBeenCalledTimes(1);
    expect(stream.destroy).toHaveBeenCalledTimes(1);
    expect(stream.destroy.mock.calls[0][0]).toBeInstanceOf(FileError);
  });

  it('should write with calling fs.write', async () => {
    const helper = new FileStreamHelper(outputOptions);
    expect(helper.filename).toEqual(filename);
    helper.open(() => {});
    const chunk = 'write';
    const callback = jest.fn();
    helper.write(chunk, callback);
    expect(fs.open).toHaveBeenCalledTimes(1);
    expect(fs.write).toHaveBeenCalledTimes(1);
    expect(fs.write).toHaveBeenCalledWith(
      fs.TEST_FILE_DESCRIPTOR,
      chunk,
      callback
    );
  });
});
