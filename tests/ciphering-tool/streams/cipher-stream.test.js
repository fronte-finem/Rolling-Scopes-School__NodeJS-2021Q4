import { Transform } from 'stream';
import {
  AtbashStream,
  CaesarDecodeStream,
  CaesarEncodeStream,
  CipherStream,
  Rot8DecodeStream,
  Rot8EncodeStream,
} from '../../../ciphering-tool/streams/cipher-stream.js';

describe('Ciphers Streams:', () => {
  it('should extend Transform stream', () => {
    expect(new CipherStream((x) => x)).toBeInstanceOf(Transform);
    expect(new AtbashStream()).toBeInstanceOf(Transform);
    expect(new CaesarEncodeStream()).toBeInstanceOf(Transform);
    expect(new CaesarDecodeStream()).toBeInstanceOf(Transform);
    expect(new Rot8EncodeStream()).toBeInstanceOf(Transform);
    expect(new Rot8DecodeStream()).toBeInstanceOf(Transform);
  });

  it('Transform -> CipherStream -> SomeConcreteCipherStream', () => {
    expect(Object.getPrototypeOf(CipherStream)).toEqual(Transform);
    expect(Object.getPrototypeOf(AtbashStream)).toEqual(CipherStream);
    expect(Object.getPrototypeOf(CaesarEncodeStream)).toEqual(CipherStream);
    expect(Object.getPrototypeOf(CaesarDecodeStream)).toEqual(CipherStream);
    expect(Object.getPrototypeOf(Rot8EncodeStream)).toEqual(CipherStream);
    expect(Object.getPrototypeOf(Rot8DecodeStream)).toEqual(CipherStream);
  });

  it('should transform input chunks', async () => {
    const reverseStream = new CipherStream((x) =>
      x.split('').reverse().join('')
    );
    const input = '12345';
    const expectedOutput = input.split('').reverse().join('');
    reverseStream.write(input);
    reverseStream.end();
    expect(reverseStream.read(input.length).toString()).toBe(expectedOutput);
  });
});
