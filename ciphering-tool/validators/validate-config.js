import {
  ConfigErrorInvalidToken,
  ConfigErrorNoConfig,
} from '../errors/config-errors/index.js';

const ConfigCiphers = new Set(['C0', 'C1', 'R0', 'R1', 'A']);

/**
 * @throws { ConfigErrorNoConfig}
 * @throws { ConfigErrorInvalidToken}
 * @type {(config: string | undefined) => string[]}
 */
export const validateConfig = (config) => {
  if (!config) {
    throw new ConfigErrorNoConfig();
  }
  const tokens = config.split('-');
  tokens.forEach((token, position) => {
    if (!ConfigCiphers.has(token)) {
      throw new ConfigErrorInvalidToken(position, token);
    }
  });
  return tokens;
};
