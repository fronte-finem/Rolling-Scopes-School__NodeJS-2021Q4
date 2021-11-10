import { accessSync, constants } from 'fs';
import {
  FileErrorNoName,
  FileErrorNotReadable,
  FileErrorNotWritable,
} from '../errors/file-error/index.js';

/**
 * @throws {FileErrorNoName}
 * @throws {FileErrorNotReadable}
 * @type {(name: string | undefined) => void}
 */
export const validateInputFile = (name) => {
  if (!name) throw new FileErrorNoName();
  try {
    accessSync(name, constants.R_OK);
  } catch (error) {
    throw new FileErrorNotReadable(name);
  }
};

/**
 * @throws {FileErrorNoName}
 * @throws {FileErrorNotWritable}
 * @type {(name: string | undefined) => void}
 */
export const validateOutputFile = (name) => {
  if (!name) throw new FileErrorNoName();
  try {
    accessSync(name, constants.W_OK);
  } catch (error) {
    throw new FileErrorNotWritable();
  }
};
