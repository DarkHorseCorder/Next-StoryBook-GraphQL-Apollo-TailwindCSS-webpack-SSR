/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const plugin = require('tailwindcss/plugin');
const typography = require('../custom/typography');

module.exports = [
  plugin(({ addComponents }) => {
    addComponents(typography);
  }),
  require('@tailwindcss/line-clamp'),
];
