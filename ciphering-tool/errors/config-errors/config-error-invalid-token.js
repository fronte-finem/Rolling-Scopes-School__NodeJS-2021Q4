import { ConfigError } from './config-error.js';

export class ConfigErrorInvalidToken extends ConfigError {
  constructor(position, code) {
    super(`on position "${position + 1}" - invalid code "${code}"`);
  }
}
