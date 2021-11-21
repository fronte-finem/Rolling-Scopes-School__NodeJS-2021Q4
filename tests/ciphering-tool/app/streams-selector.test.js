import {
  getInputStream,
  getOutputStream,
} from '../../../ciphering-tool/app/streams-selector.js';
import { InputStream } from '../../../ciphering-tool/streams/input-stream.js';
import { OutputStream } from '../../../ciphering-tool/streams/output-stream.js';

jest.mock('fs', () => ({
  constants: jest.requireActual('fs').constants,
  existsSync: jest.fn().mockReturnValue(true),
  statSync: jest.fn().mockReturnValue({ isFile: () => true }),
  open: jest.fn(),
  close: jest.fn(),
  read: jest.fn(),
  write: jest.fn(),
}));

describe('Streams selector:', () => {
  it('should select stdin or InputStream', () => {
    expect(getInputStream()).toBe(process.stdin);
    expect(getInputStream('file.txt')).toBeInstanceOf(InputStream);
  });

  it('should select stdout or OutputStream', () => {
    expect(getOutputStream()).toBe(process.stdout);
    expect(getOutputStream('file.txt')).toBeInstanceOf(OutputStream);
  });
});
