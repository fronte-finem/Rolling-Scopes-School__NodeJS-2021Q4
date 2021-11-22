import {
  AtbashStream,
  CaesarDecodeStream,
  CaesarEncodeStream,
  Rot8DecodeStream,
  Rot8EncodeStream,
} from '../streams/cipher-stream.js';

/** @type {Readonly<Map<string, CipherStream>>} */
export const CIPHERS_MAP = Object.freeze(
  new Map([
    ['A', AtbashStream],
    ['C1', CaesarEncodeStream],
    ['C0', CaesarDecodeStream],
    ['R1', Rot8EncodeStream],
    ['R0', Rot8DecodeStream],
  ])
);
