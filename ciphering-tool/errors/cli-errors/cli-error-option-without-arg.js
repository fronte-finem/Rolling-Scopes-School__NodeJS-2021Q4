import { CliErrorArg } from './cli-error-arg.js';

export class CliErrorOptionWithoutArg extends CliErrorArg {
  /**
   * @param {number} position
   * @param {string} option
   * */
  constructor(position, option) {
    super(position, option, 'option without argument');
  }
}
