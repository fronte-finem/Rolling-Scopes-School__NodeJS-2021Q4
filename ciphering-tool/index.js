import { pipeline } from 'stream/promises';
import { parseArgvToMap } from './utils/parse-argv-to-map.js';
import { errorHandler } from './utils/error-handler.js';
import { CLI_OPTION } from './configs/cli-options.js';
import { InputStream } from './streams/input-stream.js';
import { OutputStream } from './streams/output-stream.js';
import { validateConfig } from './validators/validate-config.js';

errorHandler(async () => {
  const argvMap = parseArgvToMap(process.argv.slice(2));
  const cipherStreams = validateConfig(argvMap.get(CLI_OPTION.Config));

  const inputFile = argvMap.get(CLI_OPTION.Input);
  const outputFile = argvMap.get(CLI_OPTION.Output);

  await pipeline(
    inputFile ? new InputStream(inputFile) : process.stdin,
    ...cipherStreams.map((SomeCipherStream) => new SomeCipherStream()),
    outputFile ? new OutputStream(inputFile) : process.stdout
  );
});
