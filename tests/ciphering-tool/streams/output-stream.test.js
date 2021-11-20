/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { OutputStream } from '../../../ciphering-tool/streams/output-stream.js';

jest.mock('fs');
fs.existsSync.mockReturnValue(true);
fs.statSync.mockReturnValue({ isFile: () => true });

describe('Output stream:', () => {
  it('should use module fs', async () => {
    const stream = new OutputStream('file.txt');

    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.statSync).toHaveBeenCalledTimes(1);

    stream._construct();
    expect(fs.open).toHaveBeenCalledTimes(1);

    stream._write('test');
    expect(fs.write).toHaveBeenCalledTimes(1);

    stream._destroy(null, () => {});
    expect(fs.close).toHaveBeenCalledTimes(1);
  });
});
