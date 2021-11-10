import { parseArgvToMap } from './utils/parse-argv-to-map.js';
import { errorHandler } from './utils/error-handler.js';

console.log('ciphering tool');
console.log(process.argv.slice(2));

console.log();
errorHandler(() => {
  const map = parseArgvToMap(process.argv.slice(2));
  process.stdout.write(`${map}\n`);
  console.log(map);
});
