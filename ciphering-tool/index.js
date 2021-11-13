import { pipeline } from 'stream/promises';
import { parseArgvToMap } from './utils/parse-argv-to-map.js';
import { errorHandler } from './utils/error-handler.js';
import { CLI_OPTION } from './configs/cli-options.js';
import { getInputStream } from './streams/input-stream.js';
import { getOutputStream } from './streams/output-stream.js';
import { validateConfig } from './validators/validate-config.js';

errorHandler(async () => {
  const argvMap = parseArgvToMap(process.argv.slice(2));
  const cipherStreams = validateConfig(argvMap.get(CLI_OPTION.Config));

  await pipeline(
    getInputStream(argvMap.get(CLI_OPTION.Input)),
    ...cipherStreams.map((SomeCipherStream) => new SomeCipherStream()),
    getOutputStream(argvMap.get(CLI_OPTION.Output))
  );
});
