import { CliErrorArg } from './cli-error-arg.js';

export class CliErrorUnknownArg extends CliErrorArg {
  /**
   * @param {number} position
   * @param {string} arg
   * */
  constructor(position, arg) {
    super(position, arg, 'unknown argument');
  }
}
