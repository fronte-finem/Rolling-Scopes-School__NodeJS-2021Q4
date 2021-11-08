/**
 * @typedef { string | Symbol } ArgvMapKey
 * @typedef { string | string[] } ArgvMapValue
 * @typedef { Map<ArgvMapKey, ArgvMapValue> } ArgvMap
 */

export const CLI_FREE_ARGS = Symbol('CLI free arguments');

/** @type {(token: string) => boolean} */
export const isOption = (token) => /^--?[^-]+/.test(token);

/** @type {(argv: string[]) => ArgvMap} */
export const parseArgvToMap = (argv) => {
  if (argv.length === 0) return new Map();

  /** @type {string | undefined} */
  let option;

  return argv.reduce((argvMap, token) => {
    if (option === undefined) {
      if (isOption(token)) {
        option = token;
      } else {
        if (!argvMap.has(CLI_FREE_ARGS)) {
          argvMap.set(CLI_FREE_ARGS, []);
        }
        argvMap.get(CLI_FREE_ARGS).push(token);
      }
    } else {
      const isNextOption = isOption(token);
      argvMap.set(option, isNextOption ? undefined : token);
      option = isNextOption ? token : undefined;
    }
    return argvMap;
  }, /** @type {ArgvMap} */ new Map());
};
