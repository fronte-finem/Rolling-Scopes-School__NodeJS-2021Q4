import { CliError } from './cli-error.js';

export class CliErrorArg extends CliError {
  /**
   * @param {number} position
   * @param {string} arg
   * @param {string} message
   * */
  constructor(position, arg, message) {
    super(`on position "${position + 1}" - ${message} "${arg}"`);
  }
}
