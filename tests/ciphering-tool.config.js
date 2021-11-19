/**
 * @type { string[] }
 */
export const CONFIG_TOKENS = Object.freeze(['A', 'C0', 'C1', 'R0', 'R1']);

/**
 * @typedef { {options: Readonly<string[]>, error: string} } ErrorScenario
 * @typedef { {config: string, output: string} } SuccessScenario
 */

/**
 * @param { string[] } options
 * @param { string } error
 * @return { Readonly<ErrorScenario> }
 */
const getErrorScenario = (options, error) =>
  Object.freeze({
    options: Object.freeze(options),
    error,
  });

/**
 * @param { string } config
 * @param { string } output
 * @return { Readonly<SuccessScenario> }
 */
const getSuccessScenario = (config, output) =>
  Object.freeze({ config, output });

/**
 * @type { Readonly<ErrorScenario>[] }
 */
export const ERROR_SCENARIOS = Object.freeze([
  getErrorScenario([], 'Command-Line Error: no arguments'),
  getErrorScenario(
    ['-c', 'A', '123'],
    'Command-Line Error: on position "3" - unknown argument "123"'
  ),
  getErrorScenario(
    ['-c', 'A', '-x', '123'],
    'Command-Line Error: on position "3" - unknown argument "-x"'
  ),
  getErrorScenario(
    ['-c', 'C1-C1-A-R0', '-c', 'C0'],
    'Command-Line Error: on position "3" - duplicated option "-c"'
  ),
  getErrorScenario(
    ['-c', 'C1-C1-A-R0', '--config', 'C0'],
    'Command-Line Error: on position "3" - duplicated option "--config"'
  ),
  getErrorScenario(
    ['-c', 'A', '-i', '-o', 'output.txt'],
    'Command-Line Error: on position "3" - option without argument "-i"'
  ),
  getErrorScenario(
    ['-i', 'input.txt', '-o', 'output.txt'],
    'Config Error: no config'
  ),
  getErrorScenario(
    ['-c', 'A-C1-B-C0'],
    'Config Error: on position "3" - invalid code "B"'
  ),
  getErrorScenario(
    ['--config', 'A', '--input', './'],
    'File Error: is not a file - "./"'
  ),
  getErrorScenario(
    ['--config', 'A', '--output', '../'],
    'File Error: is not a file - "../"'
  ),
  getErrorScenario(
    ['--config', 'A', '--input', '(ヘ･_･)ヘ┳━┳.txt'],
    'File Error: file not exists - "(ヘ･_･)ヘ┳━┳.txt"'
  ),
  getErrorScenario(
    ['--config', 'A', '--output', './--<-<-<@/'],
    'File Error: file not exists - "./--<-<-<@/"'
  ),
]);

/**
 * @type { Readonly<SuccessScenario>[] }
 */
export const USAGE_EXAMPLES_SCENARIOS = Object.freeze([
  getSuccessScenario('C1-C1-R0-A', 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!'),
  getSuccessScenario(
    'C1-C0-A-R1-R0-A-R0-R0-C1-A',
    'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!'
  ),
  getSuccessScenario(
    'A-A-A-R1-R0-R0-R0-C1-C1-A',
    'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!'
  ),
  getSuccessScenario(
    'C1-R1-C0-C0-A-R0-R1-R1-A-C1',
    'This is secret. Message about "_" symbol!'
  ),
]);
