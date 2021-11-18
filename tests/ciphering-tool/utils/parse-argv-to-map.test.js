import { parseArgvToMap } from '../../../ciphering-tool/utils/parse-argv-to-map.js';
import {
  CliErrorNoArg,
  CliErrorOptionDuplicate,
  CliErrorOptionWithoutArg,
  CliErrorUnknownArg,
} from '../../../ciphering-tool/errors/cli-error.js';
import {
  CLI_OPTION,
  CLI_OPTIONS_MAP,
} from '../../../ciphering-tool/configs/cli-options.js';
import {
  getRandomInt,
  getRandomItem,
} from '../../../ciphering-tool/utils/random.js';

const ALLOWED_OPTIONS = [...CLI_OPTIONS_MAP.keys()].join(', ');

const optionsAliasesMap = [...CLI_OPTIONS_MAP.entries()].reduce(
  (acc, [alias, option]) => {
    // eslint-disable-next-line no-unused-expressions
    acc[option] ? acc[option].push(alias) : (acc[option] = [alias]);
    return acc;
  },
  {}
);

const ALLOWED_OPTIONS_ALIASES = Object.getOwnPropertySymbols(
  optionsAliasesMap
).map((s) => optionsAliasesMap[s]);

const ALPHABET = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';

const getRandomOption = () =>
  Array(getRandomInt(0, 2)).fill('-').join('') +
  Array(getRandomInt(1, 9)).fill(getRandomItem(ALPHABET)).join('');

describe('Parsing array of CLI arguments to map:', () => {
  it('should throw CliErrorNoArg if passed empty array', () => {
    expect(() => parseArgvToMap([])).toThrow(CliErrorNoArg);
  });

  it('should throw CliErrorUnknownArg if passed not allowed option', () => {
    for (let i = 0; i < 1000; i += 1) {
      const option = getRandomOption();
      if (!ALLOWED_OPTIONS.includes(option)) {
        expect(() => parseArgvToMap([option, '123'])).toThrow(
          CliErrorUnknownArg
        );
      }
    }
  });

  it(`should throw CliErrorOptionDuplicate if some allowed options repeats`, () => {
    ALLOWED_OPTIONS_ALIASES.forEach(([aliasA, aliasB]) => {
      expect(() => parseArgvToMap([aliasA, '123', aliasA, '456'])).toThrow(
        CliErrorOptionDuplicate
      );
      expect(() => parseArgvToMap([aliasB, '123', aliasB, '456'])).toThrow(
        CliErrorOptionDuplicate
      );
      expect(() => parseArgvToMap([aliasA, '123', aliasB, '456'])).toThrow(
        CliErrorOptionDuplicate
      );
      expect(() => parseArgvToMap([aliasB, '123', aliasA, '456'])).toThrow(
        CliErrorOptionDuplicate
      );
    });
  });

  it(`should throw CliErrorOptionWithoutArg if some allowed options not have argument`, () => {
    expect(() => parseArgvToMap(['-c', '123', '-i', '456', '-o'])).toThrow(
      CliErrorOptionWithoutArg
    );
    expect(() => parseArgvToMap(['-c', '123', '-i', '-o', '456'])).toThrow(
      CliErrorOptionWithoutArg
    );
    expect(() => parseArgvToMap(['-c', '-i', '123', '-o', '456'])).toThrow(
      CliErrorOptionWithoutArg
    );
  });

  it(`should return Map if correct options passed`, () => {
    expect(parseArgvToMap(['-c', '123'])).toEqual(
      new Map([[CLI_OPTION.CONFIG, '123']])
    );
    expect(parseArgvToMap(['-c', '123', '-i', '456'])).toEqual(
      new Map([
        [CLI_OPTION.CONFIG, '123'],
        [CLI_OPTION.INPUT, '456'],
      ])
    );
    expect(parseArgvToMap(['-c', '123', '-o', '456'])).toEqual(
      new Map([
        [CLI_OPTION.CONFIG, '123'],
        [CLI_OPTION.OUTPUT, '456'],
      ])
    );
    expect(parseArgvToMap(['-c', '123', '-i', '456', '-o', '789'])).toEqual(
      new Map([
        [CLI_OPTION.CONFIG, '123'],
        [CLI_OPTION.INPUT, '456'],
        [CLI_OPTION.OUTPUT, '789'],
      ])
    );
  });
});
