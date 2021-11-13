/* eslint-disable max-classes-per-file */
import { BaseError } from './base-error.js';

export class ConfigError extends BaseError {
  /** @param { string } message */
  constructor(message) {
    super(message, 'Config Error');
  }
}

export class ConfigErrorNoConfig extends ConfigError {
  constructor() {
    super('no config');
  }
}

export class ConfigErrorInvalidToken extends ConfigError {
  constructor(position, code) {
    super(`on position "${position + 1}" - invalid code "${code}"`);
  }
}
