import { EOL } from 'os';
import { spawn } from 'child_process';
import { readFile, rm, writeFile } from 'fs/promises';
import {
  getRandomInt,
  getRandomItem,
} from '../../ciphering-tool/utils/random.js';
import {
  CONFIG_TOKENS,
  ERROR_SCENARIOS,
  USAGE_EXAMPLES_SCENARIOS,
} from './config.js';

describe('Error scenarios:', () => {
  const getScenario = (options, error) => async () => {
    const cipheringTool = spawn('node', ['ciphering-tool', ...options]);

    let errorData = '';
    cipheringTool.stderr.on('data', (chunk) => {
      errorData += chunk.toString();
    });

    const exitCode = await new Promise((resolve) => {
      cipheringTool.once('exit', resolve);
    });
    expect(exitCode).toEqual(1);
    expect(errorData).toEqual(`${error}${EOL}`);
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const { options, error } of ERROR_SCENARIOS) {
    test(
      `node ciphering-tool ${options.join(' ')}`,
      getScenario(options, error)
    );
  }
});

describe('Success scenarios — random correct configs:', () => {
  const getScenario = (config) => async () => {
    const cipheringTool = spawn('node', ['ciphering-tool', '--config', config]);

    let errorData = '';
    cipheringTool.stderr.on('data', (chunk) => {
      errorData += chunk.toString();
    });

    cipheringTool.kill('SIGINT');
    await new Promise((resolve) => {
      cipheringTool.once('exit', resolve);
    });
    expect(errorData).toEqual('');
  };

  const testNums = 5;

  for (let i = 0; i < testNums; i += 1) {
    const config = Array(getRandomInt(3, 9))
      .fill('')
      .map(() => getRandomItem(CONFIG_TOKENS))
      .join('-');
    test(`node ciphering-tool --config "${config}"`, getScenario(config));
  }
});

describe('Success scenarios — usage examples:', () => {
  const INPUT_DATA = 'This is secret. Message about "_" symbol!';
  const INPUT_PATH = 'tmp-input.txt';
  const OUTPUT_PATH = 'tmp-output.txt';

  beforeAll(() => writeFile(INPUT_PATH, INPUT_DATA));
  beforeEach(() => writeFile(OUTPUT_PATH, ''));
  afterAll(async () => {
    await rm(INPUT_PATH);
    await rm(OUTPUT_PATH);
  });

  const getScenario = (config, output) => async () => {
    const cipheringTool = spawn('node', [
      'ciphering-tool',
      '--config',
      config,
      '--input',
      INPUT_PATH,
      '--output',
      OUTPUT_PATH,
    ]);

    let errorData = '';
    cipheringTool.stderr.on('data', (chunk) => {
      errorData += chunk.toString();
    });

    const exitCode = await new Promise((resolve) => {
      cipheringTool.once('exit', resolve);
    });
    expect(exitCode).toEqual(0);
    expect(errorData).toEqual('');

    const data = await readFile(OUTPUT_PATH, { encoding: 'utf-8' });
    expect(data).toEqual(output);
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const { config, output } of USAGE_EXAMPLES_SCENARIOS) {
    test(
      `node ciphering-tool -c "${config}" -i "${INPUT_PATH}" -o "${OUTPUT_PATH}"`,
      getScenario(config, output)
    );
  }
});

describe('Success scenarios — "stdin => stdout" mode:', () => {
  const CONFIG = 'A';
  const INPUT_DATA = 'ABC zyx';
  const OUTPUT_DATA = 'ZYX abc';

  test(`node ciphering-tool -c ${CONFIG}; stdin: ${INPUT_DATA}; stdout: ${OUTPUT_DATA};`, async () => {
    const cipheringTool = spawn('node', ['ciphering-tool', '-c', CONFIG]);

    let errorData = '';
    cipheringTool.stderr.on('data', (chunk) => {
      errorData += chunk.toString();
    });

    let output = '';
    cipheringTool.stdout.on('data', (chunk) => {
      output += chunk.toString();
    });

    cipheringTool.stdin.write(INPUT_DATA);
    cipheringTool.stdin.end();

    await new Promise((resolve) => {
      cipheringTool.stdout.on('end', resolve);
    });
    expect(output).toEqual(OUTPUT_DATA);

    cipheringTool.kill();
    await new Promise((resolve) => {
      cipheringTool.once('exit', resolve);
    });
    expect(errorData).toEqual('');
  });
});
