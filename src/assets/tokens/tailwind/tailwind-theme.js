/* eslint-disable @typescript-eslint/no-var-requires */

const globalTokens = require('../custom/global');
const aliasTokens = require('../custom/aliases');
const lineClampTokens = require('../custom/line-clamp');

module.exports = {
  ...globalTokens,
  extend: {
    ...aliasTokens,
    ...lineClampTokens,
    transitionTimingFunction: {
      ...aliasTokens.transitionTimingFunction,
      // ease-out curve
      DEFAULT: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
};
