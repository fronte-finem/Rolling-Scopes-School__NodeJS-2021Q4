import { InputStream } from '../streams/input-stream.js';
import { OutputStream } from '../streams/output-stream.js';

/**
 * @param { string | undefined } [inputPath]
 * @return { InputStream | NodeJS.ReadStream }
 */
export const getInputStream = (inputPath) =>
  inputPath ? new InputStream(inputPath) : process.stdin;

/**
 * @param { string | undefined } [outputPath]
 * @return { OutputStream | NodeJS.WriteStream }
 */
export const getOutputStream = (outputPath) =>
  outputPath ? new OutputStream(outputPath) : process.stdout;
