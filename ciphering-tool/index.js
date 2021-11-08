import { parseArgvToMap } from './utils/parse-argv-to-map.js';

console.log('ciphering tool');
console.log(process.argv.slice(2));

console.log();
console.log(parseArgvToMap(process.argv.slice(2)));
