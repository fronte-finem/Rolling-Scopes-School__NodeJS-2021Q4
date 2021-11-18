const getOptionDescription = (name) => `CLI option: ${name}`;

/**
 * @type {  Readonly<{ CONFIG: Symbol, INPUT: Symbol, OUTPUT: Symbol}> }
 */
export const CLI_OPTION = Object.freeze({
  CONFIG: Symbol(getOptionDescription('config')),
  INPUT: Symbol(getOptionDescription('input')),
  OUTPUT: Symbol(getOptionDescription('output')),
});

/**
 * @type { Readonly<Map<string, Symbol>> }
 */
export const CLI_OPTIONS_MAP = Object.freeze(
  new Map([
    ['-c', CLI_OPTION.CONFIG],
    ['--config', CLI_OPTION.CONFIG],
    ['-i', CLI_OPTION.INPUT],
    ['--input', CLI_OPTION.INPUT],
    ['-o', CLI_OPTION.OUTPUT],
    ['--output', CLI_OPTION.OUTPUT],
  ])
);
