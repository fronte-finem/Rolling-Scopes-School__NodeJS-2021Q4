import { BaseError } from './base-error.js';

export class StreamError extends BaseError {
  /** @param { Error | string } error */
  constructor(error) {
    super(error, 'Stream Error');
  }
}
