module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-bitwise': 'off',
    'no-use-before-define': ['error', { functions: false }],
    'no-underscore-dangle': ['warn', { allowAfterThis: true }],
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'ignorePackages'],
  },
};
