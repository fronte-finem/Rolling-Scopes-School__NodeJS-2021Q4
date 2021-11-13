/**
 * @param { string } char
 * @return { boolean }
 */
const isValidChar = (char) =>
  (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z');

const BASE_UPPER = 'A'.charCodeAt(0); // A - Z  | 65 - 90
const BASE_LOWER = 'a'.charCodeAt(0); // a - z  | 97 - 122
const LATIN_MOD = 26;

/**
 * @param { string } char
 * @return { [base:number, index:number] }
 */
const normalizeChar = (char) => {
  const base = char < 'a' ? BASE_UPPER : BASE_LOWER;
  const index = char.charCodeAt(0) - base;
  return [base, index];
};

/**
 * @param { (index: number) => number } indexTransformer
 * @return { (char: string) => string }
 */
const getCharTransformer = (indexTransformer) => (char) => {
  if (!isValidChar(char)) return char;
  const [base, inputIndex] = normalizeChar(char);
  const outputIndex = indexTransformer(inputIndex);
  return String.fromCharCode(base + outputIndex);
};

/**
 * @param { number } shift
 * @return { (char: string) => string }
 */
const getCharShifter = (shift) =>
  getCharTransformer((index) => (index + shift) % LATIN_MOD);

/**
 * @param { string } char
 * @return { string }
 */
const reverseChar = getCharTransformer(
  (index) => (LATIN_MOD - (index + 1)) % LATIN_MOD
);

/**
 * @param { (char: string) => string } charTransformer
 * @return { (chunk: string) => string }
 */
const getChunkTransformer = (charTransformer) => (chunk) =>
  chunk.split('').map(charTransformer).join('');

/**
 * @param { number } shift
 * @return { (chunk: string) => string }
 */
export const getCharShiftCipher = (shift) =>
  getChunkTransformer(getCharShifter(shift));

/**
 * @param { string } chunk
 * @return { string }
 */
export const atbashCipher = getChunkTransformer(reverseChar);
