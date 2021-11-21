import {
  ConfigErrorInvalidToken,
  ConfigErrorNoConfig,
} from '../errors/config-error.js';
import { CIPHERS_MAP } from '../configs/ciphers-map.js';

/**
 * @throws { ConfigErrorNoConfig }
 * @throws { ConfigErrorInvalidToken }
 * @param { string | undefined } [config]
 * @return { (new () => CipherStream)[] }
 */
export const validateConfig = (config) => {
  if (!config) {
    throw new ConfigErrorNoConfig();
  }
  const tokens = config.split('-');
  return tokens.map((token, position) => {
    if (!CIPHERS_MAP.has(token)) {
      throw new ConfigErrorInvalidToken(position, token);
    }
    return CIPHERS_MAP.get(token);
  });
};
