/* eslint-disable max-classes-per-file */
import { BaseError } from './base-error.js';

export class FileError extends BaseError {
  /**
   * @param { string } name
   * @param { Error | string } error
   */
  constructor(name, error) {
    super(
      error instanceof Error ? error : `${error} - "${name}"`,
      'File Error'
    );
  }
}

export class FileErrorNotExists extends FileError {
  constructor(name) {
    super(name, 'file not exists');
  }
}

export class FileErrorNotFile extends FileError {
  constructor(name) {
    super(name, 'is not a file');
  }
}
