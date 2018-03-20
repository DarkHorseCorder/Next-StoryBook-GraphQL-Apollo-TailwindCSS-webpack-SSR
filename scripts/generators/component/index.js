const path = require('path');

const SRC_PATH_FROM_PLOP_FILE = '../src';
const SRC_PATH_FROM_TOP_LEVEL_COMPONENTS = '..';
const SRC_PATH_FROM_ROOT = './src';

const OutputLocations = {
  TOP_LEVEL: '@/components',
  CWD: './components',
};

const componentGenerator = {
  description: 'Component Generator',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'component name',
    },
    {
      type: 'list',
      name: 'where',
      message: 'where should we put this component?',
      default: 0,
      choices: [OutputLocations.TOP_LEVEL, OutputLocations.CWD],
    },
  ],
  actions: function (data) {
    const currentAbsolutePath = process.env.INIT_CWD;
    const isPlopHere = data.where === OutputLocations.CWD;
    const location = isPlopHere ? currentAbsolutePath : SRC_PATH_FROM_PLOP_FILE;

    const rootAbsolutePath = process.cwd();
    const srcAbsolutePath = path.resolve(rootAbsolutePath, SRC_PATH_FROM_ROOT);

    const relativePathToSrcFromHere = path.relative(
      currentAbsolutePath,
      srcAbsolutePath
    );

    // two folders deeper since at /components/styles.scss
    const relativePathToSrcFromStylesScss =
      '../../' + relativePathToSrcFromHere;

    return [
      {
        type: 'add',
        path: `${location}/components/{{dashCase name}}/index.ts`,
        templateFile: 'generators/component/index.ts.hbs',
      },
      {
        type: 'add',
        path: `${location}/components/{{dashCase name}}/{{properCase name}}.tsx`,
        templateFile: 'generators/component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: `${location}/components/{{dashCase name}}/styles.scss`,
        templateFile: 'generators/component/styles.scss.hbs',
        data: {
          pathToSrc: isPlopHere ? relativePathToSrcFromStylesScss : '../..',
        },
      },
      {
        type: 'add',
        path: `${location}/components/{{dashCase name}}/__stories__/{{properCase name}}.stories.tsx`,
        templateFile: 'generators/component/Component.stories.tsx.hbs',
      },
      {
        type: 'append',
        path: `${location}/components/index.ts`,
        template:
          "export { {{ properCase name }} } from './{{dashCase name }}';",
        // index.ts at parent level might not exist, don't abort if it doesn't
        abortOnFail: false,
      },
      {
        type: 'append',
        path: `${location}/components/all.scss`,
        template:
          "@use '{{dashCase name}}/styles.scss' as {{dashCase name}}-styles;",
        // all.scss won't always exist, but don't abort if it doesn't
        abortOnFail: false,
      },
    ];
  },
};

module.exports = { componentGenerator };
