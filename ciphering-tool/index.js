import { pipeline } from 'stream/promises';
import { parseArgvToMap } from './utils/parse-argv-to-map.js';
import { errorHandler } from './utils/error-handler.js';
import { OptionInput, OptionOutput } from './configs/cli-options.js';
import { getInputStream } from './streams/input-stream.js';
import { getOutputStream } from './streams/output-stream.js';
import { FileError } from './errors/file-error/file-error.js';

console.log('ciphering tool');
console.log(process.argv.slice(2));

console.log();
errorHandler(async () => {
  const map = parseArgvToMap(process.argv.slice(2));
  process.stdout.write(`${map}\n`);
  console.log(map);

  try {
    await pipeline(
      getInputStream(map.get(OptionInput)),
      getOutputStream(map.get(OptionOutput))
    );
  } catch (error) {
    throw new FileError(error.message);
  }
});
