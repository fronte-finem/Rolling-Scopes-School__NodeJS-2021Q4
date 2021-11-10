import { BaseError } from '../base-error.js';

export class ConfigError extends BaseError {
  /** @param {string} message */
  constructor(message) {
    super(`Config Error: ${message}`);
  }
}
