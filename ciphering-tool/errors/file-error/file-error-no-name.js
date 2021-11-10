import { FileError } from './file-error.js';

export class FileErrorNoName extends FileError {
  constructor() {
    super('no file name');
  }
}
