import { ConfigError } from './config-error.js';

export class ConfigErrorNoConfig extends ConfigError {
  constructor() {
    super('no config');
  }
}
