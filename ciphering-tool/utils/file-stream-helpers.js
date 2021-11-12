import { close, constants, open, read, write } from 'fs';
import { STDIN_FILE_HANDLE, STDOUT_FILE_HANDLE } from '../configs/constants.js';

/**
 *
 * @typedef { undefined | null | Error } MaybeError
 *
 * @typedef { (error?: MaybeError) => void } Callback
 *
 * @typedef {
 *    {
 *      stream: Stream,
 *      filename: string | undefined,
 *      isInput: boolean | undefined,
 *    }
 * } FileStreamHelperOptions
 *
 */

export class FileStreamHelper {
  /**
   * @param { FileStreamHelperOptions } options
   */
  constructor({ stream, filename, isInput = true }) {
    this.stream = stream;
    this.filename = filename;
    this.fileHandle = isInput ? STDIN_FILE_HANDLE : STDOUT_FILE_HANDLE;
    this.flags = isInput
      ? constants.O_RDONLY
      : constants.O_CREAT | constants.O_APPEND;
  }

  /**
   * @param { Callback } callback
   */
  open(callback) {
    if (this.filename) {
      open(this.filename, this.flags, (error, fileHandle) => {
        if (!error) {
          // eslint-disable-next-line no-param-reassign
          this.fileHandle = fileHandle;
        }
        callback(error);
      });
    } else {
      callback();
    }
  }

  /**
   * @param { MaybeError } error
   * @param { Callback } callback
   */
  close(error, callback) {
    if (this.fileHandle) {
      close(this.fileHandle, (closingError) => callback(closingError || error));
    } else {
      callback(error);
    }
    this.stream = null;
    this.fileHandle = undefined;
  }

  /**
   * @param { number } size
   */
  read(size) {
    const buffer = Buffer.alloc(size);
    read(this.fileHandle, buffer, 0, size, null, (error, bytesRead) => {
      if (error) {
        this.stream.destroy(error);
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
