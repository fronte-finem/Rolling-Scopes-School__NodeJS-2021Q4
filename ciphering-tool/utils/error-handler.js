import { EOL } from 'os';
import { BaseError } from '../errors/base-error.js';

/**
 * @param { Promise<void> } run
 */
export const errorHandler = (run) => {
  let message;
  run()
    .catch((error) => {
      if (error instanceof BaseError) {
        message = error.message;
        process.exitCode = 1;
      } else if (error instanceof Error) {
        message = error.message;
        process.exitCode = 2;
      } else if (typeof error === 'string') {
        message = error;
        process.exitCode = 3;
      } else {
        message = `Unknown error: ${String(error)}`;
        process.exitCode = 42;
      }
    })
    .finally(() => {
      if (message) process.stderr.write(`${message}${EOL}`);
      process.exit(process.exitCode);
    });
};
