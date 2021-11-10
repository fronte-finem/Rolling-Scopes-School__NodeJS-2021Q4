import { FileError } from './file-error.js';

export class FileErrorNotWritable extends FileError {
  constructor(name) {
    super(`not writable file "${name}"`);
  }
}
