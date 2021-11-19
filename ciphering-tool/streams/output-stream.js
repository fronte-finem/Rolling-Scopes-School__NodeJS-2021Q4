import { Writable } from 'stream';
import { FileStreamHelper } from '../utils/file-stream-helpers.js';

export class OutputStream extends Writable {
  /**
   * @param { string } filename
   */
  constructor(filename) {
    super();
    /** @type { FileStreamHelper | undefined } */
    this.helper = new FileStreamHelper({
      stream: this,
      filename,
      isInput: false,
    });
  }

  _construct(callback) {
    this.helper?.open(callback);
  }

  _destroy(error, callback) {
    this.helper?.close(error, callback);
  }

  _write(chunk, encoding, callback) {
    this.helper?.write(chunk, callback);
  }
}
