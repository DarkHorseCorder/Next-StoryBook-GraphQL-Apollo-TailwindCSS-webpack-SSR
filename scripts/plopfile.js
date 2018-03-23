const { componentGenerator } = require('./generators/component/index');

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('component', componentGenerator);
};
