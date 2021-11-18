import { pipeline } from 'stream/promises';
import { parseArgvToMap } from './utils/parse-argv-to-map.js';
import { errorHandler } from './utils/error-handler.js';
import { CLI_OPTION } from './configs/cli-options.js';
import { InputStream } from './streams/input-stream.js';
import { OutputStream } from './streams/output-stream.js';
import { validateConfig } from './validators/validate-config.js';

errorHandler(async () => {
  const argvMap = parseArgvToMap(process.argv.slice(2));
  const cipherStreamClasses = validateConfig(argvMap.get(CLI_OPTION.CONFIG));

  const inputPath = argvMap.get(CLI_OPTION.INPUT);
  const outputPath = argvMap.get(CLI_OPTION.OUTPUT);

  const inputStream = inputPath ? new InputStream(inputPath) : process.stdin;
  const outputStream = outputPath
    ? new OutputStream(outputPath)
    : process.stdout;

  const cipherStreams = cipherStreamClasses.map(
    (SomeCipherStreamClass) => new SomeCipherStreamClass()
  );

  await pipeline(inputStream, ...cipherStreams, outputStream);
});
