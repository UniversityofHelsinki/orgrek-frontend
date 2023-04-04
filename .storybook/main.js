module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
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
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  features: {
    interactionsDebugger: true,
  },
};
