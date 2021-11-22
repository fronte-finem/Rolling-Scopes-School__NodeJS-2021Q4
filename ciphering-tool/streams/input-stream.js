import { Readable } from 'stream';
import { FileStreamHelper } from '../utils/file-stream-helpers.js';

export class InputStream extends Readable {
  /**
   * @param { string } filename
   * @param { AbortSignal | undefined } [signal]
   */
  constructor(filename, signal) {
    super({ signal });
    this.helper = new FileStreamHelper({
      stream: this,
      filename,
      isInput: true,
    });
  }

  _construct(callback) {
    this.helper.open(callback);
  }

  _destroy(error, callback) {
    this.helper.close(error, callback);
  }

  _read(size) {
    this.helper.read(size);
  }
}
