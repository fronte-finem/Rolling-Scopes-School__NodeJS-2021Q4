import { BaseError } from '../errors/base-error.js';

export const errorHandler = (run) => {
  try {
    run();
  } catch (error) {
    let message;
    let exitCode = 42;
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
      message = `Unknown error: ${String(error)}`;
    }
    process.stderr.write(message);
    process.exit(exitCode);
  }
};
