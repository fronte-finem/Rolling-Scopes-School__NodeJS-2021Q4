import fs from 'fs';
import { main } from '../../../ciphering-tool/app/main.js';

const originalArgv = process.argv;
const command = 'node app -c A -i input.txt -o output.txt';

jest.mock('fs', () => ({
  constants: jest.requireActual('fs').constants,
  existsSync: jest.fn().mockReturnValue(true),
  statSync: jest.fn().mockReturnValue({ isFile: () => true }),
  open: jest.fn().mockImplementation((...[, , callback]) => callback(null, 42)),
  close: jest.fn().mockImplementation((_, callback) => callback()),
  read: jest
    .fn()
    .mockImplementation((...[, , , , , callback]) => callback(null, 0))
    .mockImplementationOnce((...[, , , , , callback]) => callback(null, 5)),
  write: jest
    .fn()
    .mockImplementation((...[, , callback]) => callback(null, 0))
    .mockImplementationOnce((...[, , callback]) => callback(null, 5)),
}));

beforeAll(() => {
  process.argv = command.split(' ');
});

afterAll(() => {
  process.argv = originalArgv;
});

describe('Main:', () => {
  it('should run app', async () => {
    await main();
    expect(fs.open).toHaveBeenCalled();
    expect(fs.close).toHaveBeenCalled();
    expect(fs.read).toHaveBeenCalled();
    expect(fs.write).toHaveBeenCalled();
  });
});
