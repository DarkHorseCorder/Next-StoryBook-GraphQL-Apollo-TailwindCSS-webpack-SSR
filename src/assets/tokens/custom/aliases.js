// eslint-disable-next-line @typescript-eslint/no-var-requires
const global = require('./global');

const colorAliases = {
  success: global.colors.green,
  warning: global.colors.yellow,
  danger: global.colors.orange,
};

module.exports = {
  colors: colorAliases,
  textColor: colorAliases,
  outline: {
    default: [`2px solid #006AFF40`],
  },
  boxShadow: {
    sm: '0 0 0 1px rgba(35, 31, 50, 0.08)',
  },
};
