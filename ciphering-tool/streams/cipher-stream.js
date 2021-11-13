/* eslint-disable max-classes-per-file */
import { Transform } from 'stream';
import {
  atbashCipher,
  getCharShiftCipher,
} from '../utils/ciphering-helpers.js';

export class CipherStream extends Transform {
  /**
   * @param { (chunk:string) => string } cipher
   */
  constructor(cipher) {
    super();
    this.cipher = cipher;
  }

  _transform(chunk, encoding, callback) {
    this.push(this.cipher(chunk.toString()));
    callback();
  }
}

export class AtbashStream extends CipherStream {
  constructor() {
    super(atbashCipher);
  }
}

export class CaesarEncodeStream extends CipherStream {
  constructor() {
    super(getCharShiftCipher(1));
  }
}

export class CaesarDecodeStream extends CipherStream {
  constructor() {
    super(getCharShiftCipher(-1));
  }
}

export class Rot8EncodeStream extends CipherStream {
  constructor() {
    super(getCharShiftCipher(8));
  }
}

export class Rot8DecodeStream extends CipherStream {
  constructor() {
    super(getCharShiftCipher(-8));
  }
}
