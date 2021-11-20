import { EOL } from 'os';
import { errorHandler } from '../../../ciphering-tool/utils/error-handler.js';
import { CliErrorNoArg } from '../../../ciphering-tool/errors/cli-error.js';
import { stringify } from '../../../ciphering-tool/utils/stringify.js';

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
const mockStderr = jest
  .spyOn(process.stderr, 'write')
  .mockImplementation(() => {});

describe('Error handler:', () => {
  beforeEach(() => {
    mockExit.mockClear();
    mockStderr.mockClear();
  });

  afterAll(() => {
    mockExit.mockRestore();
    mockStderr.mockRestore();
  });

  it('should handle instances of BaseError', async () => {
    const error = new CliErrorNoArg();
    const ERROR_CODE = 1;
    await errorHandler(async () => {
      throw error;
    });
    expect(mockStderr).toHaveBeenCalledTimes(1);
    expect(mockStderr).toHaveBeenCalledWith(`${error.message}${EOL}`);
    expect(mockExit).toHaveBeenCalledTimes(1);
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);
  });

  it('should handle instances of Error', async () => {
    const error = new Error('Simple error');
    const ERROR_CODE = 2;
    await errorHandler(async () => {
      throw error;
    });
    expect(mockStderr).toHaveBeenCalledTimes(1);
    expect(mockStderr).toHaveBeenCalledWith(`${error.message}${EOL}`);
    expect(mockExit).toHaveBeenCalledTimes(1);
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);
  });

  it('should handle string-type error', async () => {
    const error = 'String-type error';
    const ERROR_CODE = 3;
    await errorHandler(async () => {
      throw error;
    });
    expect(mockStderr).toHaveBeenCalledTimes(1);
    expect(mockStderr).toHaveBeenCalledWith(`${error}${EOL}`);
    expect(mockExit).toHaveBeenCalledTimes(1);
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);
  });

  it('should handle unknown-type error', async () => {
    const error = Symbol('Symbol-type error');
    const ERROR_CODE = 42;
    await errorHandler(async () => {
      throw error;
    });
    expect(mockStderr).toHaveBeenCalledTimes(1);
    expect(mockStderr).toHaveBeenCalledWith(
      `Unknown type-error: ${stringify(error)}${EOL}`
    );
    expect(mockExit).toHaveBeenCalledTimes(1);
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);
  });

  it('should exit with 0-code if no errors', async () => {
    const ERROR_CODE = 0;
    await errorHandler(async () => {});
    expect(mockStderr).toHaveBeenCalledTimes(0);
    expect(mockExit).toHaveBeenCalledTimes(1);
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);
  });
});
