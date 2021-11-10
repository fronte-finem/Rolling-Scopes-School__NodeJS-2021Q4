import { BaseError } from '../base-error.js';

export class CliError extends BaseError {
  /** @param {string} message */
  constructor(message) {
    super(`Command Error: ${message}`);
  }
}
