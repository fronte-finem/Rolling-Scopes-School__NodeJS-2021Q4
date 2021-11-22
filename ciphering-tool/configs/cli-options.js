const getOptionDescription = (name) => `CLI option: ${name}`;

/**
 * @type {  Readonly<{ Config: symbol, Input: symbol, Output: symbol}> }
 */
export const CLI_OPTION = Object.freeze({
  Config: Symbol(getOptionDescription('config')),
  Input: Symbol(getOptionDescription('input')),
  Output: Symbol(getOptionDescription('output')),
});

/**
 * @type { Readonly<Map<string, Symbol>> }
 */
export const CLI_OPTIONS_MAP = Object.freeze(
  new Map([
    ['-c', CLI_OPTION.Config],
    ['--config', CLI_OPTION.Config],
    ['-i', CLI_OPTION.Input],
    ['--input', CLI_OPTION.Input],
    ['-o', CLI_OPTION.Output],
    ['--output', CLI_OPTION.Output],
  ])
);
