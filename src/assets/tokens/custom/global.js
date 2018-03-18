/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const tw = require('tailwindcss/defaultTheme');
const colors = require('./colors');
const textColors = require('./text-colors');
const screens = require('./screens');

const textColorConfig = {
  ...colors,
  ...textColors,
};

module.exports = {
  // tailwind default tokens
  spacing: tw.spacing,
  borderRadius: tw.borderRadius,
  borderWidth: tw.borderWidth,
  boxShadow: tw.boxShadow,
  fontSize: tw.fontSize,
  letterSpacing: tw.letterSpacing,
  lineHeight: tw.lineHeight,
  maxWidth: tw.maxWidth,
  opacity: tw.opacity,
  outline: tw.outline,
  scale: tw.scale,
  transitionProperty: tw.transitionProperty,
  transitionTimingFunction: tw.transitionTimingFunction,
  transitionDuration: tw.transitionDuration,

  // custom tokens
  screens,
  colors,
  textColor: textColorConfig,
};
