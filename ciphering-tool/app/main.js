import { pipeline } from 'stream/promises';
import { parseArgvToMap } from '../utils/parse-argv-to-map.js';
import { validateConfig } from '../validators/validate-config.js';
import { CLI_OPTION } from '../configs/cli-options.js';
import { getInputStream, getOutputStream } from './streams-selector.js';

export const main = async () => {
  const argvMap = parseArgvToMap(process.argv.slice(2));

  /** @type { (new() => CipherStream)[] } */
  const cipherStreamClasses = validateConfig(argvMap.get(CLI_OPTION.CONFIG));

  const inputPath = argvMap.get(CLI_OPTION.INPUT);
  const outputPath = argvMap.get(CLI_OPTION.OUTPUT);

  const inputStream = getInputStream(inputPath);
  const outputStream = getOutputStream(outputPath);

  /** @type { CipherStream[] } */
  const cipherStreams = cipherStreamClasses.map(
    (SomeCipherStreamClass) => new SomeCipherStreamClass()
  );

  /** @type { (CipherStream | InputStream | OutputStream | NodeJS.ReadStream | NodeJS.WriteStream)[] } */
  const streams = [inputStream, ...cipherStreams, outputStream];

  await pipeline(...streams);
};
