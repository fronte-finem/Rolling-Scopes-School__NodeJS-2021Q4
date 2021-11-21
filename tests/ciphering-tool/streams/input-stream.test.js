/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { InputStream } from '../../../ciphering-tool/streams/input-stream.js';

jest.mock('fs');
fs.existsSync.mockReturnValue(true);
fs.statSync.mockReturnValue({ isFile: () => true });

describe('Input stream:', () => {
  it('should use module fs', async () => {
    const stream = new InputStream('file.txt');

    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.statSync).toHaveBeenCalledTimes(1);

    stream._construct();
    expect(fs.open).toHaveBeenCalledTimes(1);

    stream._read(42);
    expect(fs.read).toHaveBeenCalledTimes(1);

    stream._destroy(null, () => {});
    expect(fs.close).toHaveBeenCalledTimes(1);
  });
});
