export const OptionConfig = Symbol('CLI option: config');
export const OptionInput = Symbol('CLI option: input');
export const OptionOutput = Symbol('CLI option: output');

/** @type {Readonly<Map<string, Symbol>>} */
export const CLI_OPTIONS_MAP = Object.freeze(
  new Map([
    ['-c', OptionConfig],
    ['--config', OptionConfig],
    ['-i', OptionInput],
    ['--input', OptionInput],
    ['-o', OptionOutput],
    ['--output', OptionOutput],
  ])
);
