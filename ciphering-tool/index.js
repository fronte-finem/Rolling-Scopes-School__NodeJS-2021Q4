import { pipeline } from 'stream/promises';
import { parseArgvToMap } from './utils/parse-argv-to-map.js';
import { errorHandler } from './utils/error-handler.js';
import { OptionInput, OptionOutput } from './configs/cli-options.js';
import { InputStream } from './streams/input-stream.js';
import { OutputStream } from './streams/output-stream.js';

console.log('ciphering tool');
console.log(process.argv.slice(2));

console.log();
errorHandler(async () => {
  const map = parseArgvToMap(process.argv.slice(2));
  process.stdout.write(`${map}\n`);
  console.log(map);

  try {
    await pipeline(
      new InputStream(map.get(OptionInput)),
      new OutputStream(map.get(OptionOutput))
    );
    console.log('Pipeline succeeded.');
  } catch (error) {
    console.error('Pipeline failed.', error.message);
  }
});
