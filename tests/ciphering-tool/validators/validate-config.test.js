import { validateConfig } from '../../../ciphering-tool/validators/validate-config.js';
import {
  ConfigErrorInvalidToken,
  ConfigErrorNoConfig,
} from '../../../ciphering-tool/errors/config-error.js';
import {
  AtbashStream,
  CaesarDecodeStream,
  CaesarEncodeStream,
  Rot8DecodeStream,
  Rot8EncodeStream,
} from '../../../ciphering-tool/streams/cipher-stream.js';

describe('Test config validation', () => {
  it('should throw error if config not passed', () => {
    expect(validateConfig).toThrowError(ConfigErrorNoConfig);
    expect(() => validateConfig('')).toThrowError(ConfigErrorNoConfig);
  });

  it('should throw error if get invalid token', () => {
    expect(validateConfig).toThrowError(ConfigErrorNoConfig);
    expect(() => validateConfig('A0')).toThrowError(ConfigErrorInvalidToken);
    expect(() => validateConfig('A1')).toThrowError(ConfigErrorInvalidToken);
    expect(() => validateConfig('C')).toThrowError(ConfigErrorInvalidToken);
    expect(() => validateConfig('C2')).toThrowError(ConfigErrorInvalidToken);
    expect(() => validateConfig('R')).toThrowError(ConfigErrorInvalidToken);
    expect(() => validateConfig('R2')).toThrowError(ConfigErrorInvalidToken);
  });

  it('should return Array of Cipher-Streams if config correct', () => {
    const streams = validateConfig('A-C0-R1-C1-R0-A');
    expect(streams).toBeInstanceOf(Array);
    expect(streams).toHaveLength(6);
    expect(streams[0]).toEqual(AtbashStream);
    expect(streams[1]).toEqual(CaesarDecodeStream);
    expect(streams[2]).toEqual(Rot8EncodeStream);
    expect(streams[3]).toEqual(CaesarEncodeStream);
    expect(streams[4]).toEqual(Rot8DecodeStream);
    expect(streams[5]).toEqual(AtbashStream);
  });
});
