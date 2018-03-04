/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./src/assets/tokens/tailwind-config');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.@(tsx|mdx)'],
  ...config,
  // force explicit values
  theme: {
    ...config.theme,
    spacing: {},
    extend: {
      ...config.theme.extend,
      inset: { 0: 0 },
    },
  },
};
