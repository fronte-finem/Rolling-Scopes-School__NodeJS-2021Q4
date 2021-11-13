/* eslint-disable max-classes-per-file */
import { BaseError } from './base-error.js';

export class CliError extends BaseError {
  /** @param { string } message */
  constructor(message) {
    super(message, 'Command-Line Error');
  }
}

export class CliErrorArg extends CliError {
  /**
   * @param { number } position
   * @param { string } arg
   * @param { string } message
   * */
  constructor(position, arg, message) {
    super(`on position "${position + 1}" - ${message} "${arg}"`);
  }
}

export class CliErrorNoArg extends CliError {
  constructor() {
    super('no arguments');
  }
}

export class CliErrorOptionDuplicate extends CliErrorArg {
  /**
   * @param { number } position
   * @param { string } option
   * */
  constructor(position, option) {
    super(position, option, 'duplicated option');
  }
}

export class CliErrorOptionWithoutArg extends CliErrorArg {
  /**
   * @param {number} position
   * @param {string} option
   * */
  constructor(position, option) {
    super(position, option, 'option without argument');
  }
}

export class CliErrorUnknownArg extends CliErrorArg {
  /**
   * @param {number} position
   * @param {string} arg
   * */
  constructor(position, arg) {
    super(position, arg, 'unknown argument');
  }
}
