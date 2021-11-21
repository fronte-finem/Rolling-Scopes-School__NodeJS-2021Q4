import { EOL } from 'os';
import { BaseError } from '../errors/base-error.js';
import { stringify } from './stringify.js';

/**
 * @param { () => Promise<void> } run
 * @return { Promise<void> }
 */
export const errorHandler = async (run) => {
  let message;
  let exitCode = 0;
  try {
    await run();
  } catch (error) {
    if (error instanceof BaseError) {
      message = error.message;
      exitCode = 1;
    } else if (error instanceof Error) {
      message = error.message;
      exitCode = 2;
    } else if (typeof error === 'string') {
      message = error;
      exitCode = 3;
    } else {
      message = `Unknown type-error: ${stringify(error)}`;
      exitCode = 42;
    }
  } finally {
    if (message) process.stderr.write(`${message}${EOL}`);
    process.exit(exitCode);
  }
};
