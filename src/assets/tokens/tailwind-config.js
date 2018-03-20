/* eslint-disable @typescript-eslint/no-var-requires */

const theme = require('./tailwind/tailwind-theme');
const corePlugins = require('./tailwind/tailwind-core-plugins');
const plugins = require('./tailwind/tailwind-plugins');

module.exports = {
  theme,
  plugins,
  corePlugins,
};
