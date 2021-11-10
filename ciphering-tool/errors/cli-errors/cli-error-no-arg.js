import { CliError } from './cli-error.js';

export class CliErrorNoArg extends CliError {
  constructor() {
    super('no arguments');
  }
}
