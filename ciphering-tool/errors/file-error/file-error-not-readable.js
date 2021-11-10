import { FileError } from './file-error.js';

export class FileErrorNotReadable extends FileError {
  constructor(name) {
    super(`not readable file "${name}"`);
  }
}
