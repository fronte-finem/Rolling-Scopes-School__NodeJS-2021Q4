import { BaseError } from '../base-error.js';

export class FileError extends BaseError {
  /** @param {string} message */
  constructor(message) {
    super(`File System Error: ${message}`);
  }
}
