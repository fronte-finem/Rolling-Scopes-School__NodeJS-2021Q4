import { CliErrorArg } from './cli-error-arg.js';

export class CliErrorOptionDuplicate extends CliErrorArg {
  /**
   * @param {number} position
   * @param {string} option
   * */
  constructor(position, option) {
    super(position, option, 'duplicated option');
  }
}
