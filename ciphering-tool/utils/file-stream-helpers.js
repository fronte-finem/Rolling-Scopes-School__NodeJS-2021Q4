import { close, constants, open, read, write, statSync, existsSync } from 'fs';
import {
  FileError,
  FileErrorNotExists,
  FileErrorNotFile,
} from '../errors/file-error.js';
import { StreamError } from '../errors/stream-error.js';

/**
 *
 * @typedef { undefined | null | Error } MaybeError
 *
 * @typedef { (error?: MaybeError) => void } Callback
 *
 * @typedef {
 *    {
 *      stream: Stream | Readable | Writable,
 *      filename: string,
 *      isInput?: boolean | undefined,
 *    }
 * } FileStreamHelperOptions
 *
 */

export class FileStreamHelper {
  /**
   * @param { FileStreamHelperOptions } options
   */
  constructor({ stream, filename, isInput = true }) {
    if (!existsSync(filename)) {
      throw new FileErrorNotExists(filename);
    }
    if (!statSync(filename).isFile()) {
      throw new FileErrorNotFile(filename);
    }
    this.stream = stream;
    this.filename = filename;
    this.fileHandle = 0;
    this.flags = isInput ? constants.O_RDONLY : constants.O_APPEND;
  }

  /**
   * @param { Callback } callback
   */
  open(callback) {
    open(this.filename, this.flags, (error, fileHandle) => {
      if (!error) {
        // eslint-disable-next-line no-param-reassign
        this.fileHandle = fileHandle;
      }
      callback(error && new FileError(this.filename, error));
    });
  }

  /**
   * @param { MaybeError } error
   * @param { Callback } callback
   */
  close(error, callback) {
    close(this.fileHandle, (closingError) =>
      callback(
        closingError
          ? new FileError(this.filename, closingError)
          : error && new StreamError(error)
      )
    );
  }

  /**
   * @param { number } size
   */
  read(size) {
    const buffer = Buffer.alloc(size);
    read(this.fileHandle, buffer, 0, size, null, (error, bytesRead) => {
      if (error) {
        this.stream.destroy(new FileError(this.filename, error));
      } else {
        this.stream.push(bytesRead > 0 ? buffer.slice(0, bytesRead) : null);
      }
    });
  }

  /**
   * @param { Buffer | string | * } chunk
   * @param { Callback } callback
   */
  write(chunk, callback) {
    write(this.fileHandle, chunk, callback);
  }
}
