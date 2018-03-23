const config = require('../src/assets/tokens/tailwind-config');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.@(tsx|mdx)'],
  ...config,
};
