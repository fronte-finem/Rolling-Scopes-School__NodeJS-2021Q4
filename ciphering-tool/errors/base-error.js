/**
 * @param { Error } error
 * @return { string }
 */
const getMessage = (error) => error.message.replace(/.*:\s/, '');

export class BaseError extends Error {
  /**
   * @param { Error | string } error
   * @param { string } [prefix]
   */
  constructor(error, prefix) {
    const message = error instanceof Error ? getMessage(error) : error;
    super(`${prefix}: ${message}`);
    this.name = this.constructor.name;
  }
}
