import {
  atbashCipher,
  getCharShiftCipher,
} from '../../../ciphering-tool/utils/ciphering-helpers.js';
import { getRandomInt } from '../../../ciphering-tool/utils/random.js';

const getRandomNotAlphabetCode = () => {
  const [A, Z, a, z] = 'AZaz'.split('').map((x) => x.charCodeAt(0));
  let code = NaN;
  do {
    code = getRandomInt(0x0, 0xfffe);
  } while ((code >= A && code <= Z) || (code >= a && code <= z));
  return code;
};

const getNotAlphabetRange = (length) =>
  Array(length)
    .fill(undefined)
    .map(() => String.fromCharCode(getRandomNotAlphabetCode()));

describe('Char shift cipher:', () => {
  it('should return same input if it not contain chars from A-Z or a-z', () => {
    const charShiftCipher = getCharShiftCipher(getRandomInt(1, 13));
    const input = getNotAlphabetRange(1000).join('');
    expect(charShiftCipher(input)).toBe(input);
  });

  it(`should return encoded output with shifted chars from range A-Z and a-z`, () => {
    const charShiftCipher = getCharShiftCipher(1);
    const input = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
    const expectedOutput =
      'BbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzAa';
    expect(charShiftCipher(input)).toEqual(expectedOutput);
  });

  it(`should return decoded output with shifted chars from range A-Z and a-z`, () => {
    const charShiftCipher = getCharShiftCipher(-1);
    const input = 'BbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzAa';
    const expectedOutput =
      'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
    expect(charShiftCipher(input)).toEqual(expectedOutput);
  });
});

describe('Atbash cipher:', () => {
  it('should return same input if it not contain chars from A-Z or a-z', () => {
    const input = getNotAlphabetRange(1000).join('');
    expect(atbashCipher(input)).toBe(input);
  });

  it(`should return reversed chars from range A-Z and a-z`, () => {
    const input = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
    const expectedOutput =
      'ZzYyXxWwVvUuTtSsRrQqPpOoNnMmLlKkJjIiHhGgFfEeDdCcBbAa';
    expect(atbashCipher(input)).toEqual(expectedOutput);
  });
});
