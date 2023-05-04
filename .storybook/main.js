/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['../src'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/preset-create-react-app',
    'storybook-addon-react-router-v6',
    {
      name: '@storybook/addon-coverage',
      options: {
        istanbul: {
          exclude: [
            'src/mockStore/**', // test utils need no coverage
            'src/actions/**', // legacy code not tested in Storybook
            'src/reducers/**', // same as above
          ],
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

export default config;
