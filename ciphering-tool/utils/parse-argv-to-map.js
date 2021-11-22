import {
  CliErrorNoArg,
  CliErrorOptionDuplicate,
  CliErrorUnknownArg,
  CliErrorOptionWithoutArg,
} from '../errors/cli-error.js';
import { CLI_OPTIONS_MAP } from '../configs/cli-options.js';

/**
 * @throws {CliErrorNoArg}
 * @throws {CliErrorUnknownArg}
 * @throws {CliErrorOptionDuplicate}
 * @throws {CliErrorOptionWithoutArg}
 * @type {(argv: string[]) => Map<Symbol, string>}
 */
export const parseArgvToMap = (argv) => {
  if (argv.length === 0) throw new CliErrorNoArg();

  /** @type {string | undefined} */
  let prevOptionToken;

  /** @type {Map<Symbol, string>} */
  const argvMap = new Map();

  for (let position = 0; position < argv.length; position += 1) {
    const token = argv[position];
    if (prevOptionToken) {
      if (CLI_OPTIONS_MAP.has(token)) {
        throw new CliErrorOptionWithoutArg(position, prevOptionToken);
      }
      argvMap.set(CLI_OPTIONS_MAP.get(prevOptionToken), token);
      prevOptionToken = undefined;
    } else {
      if (!CLI_OPTIONS_MAP.has(token)) {
        throw new CliErrorUnknownArg(position, token);
      }
      if (argvMap.has(CLI_OPTIONS_MAP.get(token))) {
        throw new CliErrorOptionDuplicate(position, token);
      }
      prevOptionToken = token;
    }
  }

  if (prevOptionToken) {
    throw new CliErrorOptionWithoutArg(argv.length - 1, prevOptionToken);
  }

  return argvMap;
};
