import { Writable } from 'stream';
import { FileStreamHelper } from '../utils/file-stream-helpers.js';

export class OutputStream extends Writable {
  /**
   * @param {string} filename
   * @param { AbortSignal | undefined } [signal]
   */
  constructor(filename, signal) {
    super({ signal });
    this.helper = new FileStreamHelper({
      stream: this,
      filename,
      isInput: false,
    });
  }

  _construct(callback) {
    this.helper.open(callback);
  }

  _destroy(error, callback) {
    this.helper.close(error, callback);
  }

  _write(chunk, encoding, callback) {
    this.helper.write(chunk, callback);
  }
}

/**
 * @param { string | undefined } filename
 */
export const getOutputStream = (filename) =>
  filename ? new OutputStream(filename) : process.stdout;
