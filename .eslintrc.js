module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:cypress/recommended',
    'plugin:storybook/recommended',
    'prettier', // Prettier should always be the last item in this array
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', 'cypress'],
  rules: {
    eqeqeq: 'error',
    'no-unused-vars': 'off',
    complexity: ['error', 20],
    'max-lines-per-function': ['error', 300],
    'max-lines': ['error', 500],
    'no-console': 0,
    'react/prop-types': 0,
    'jest/expect-expect': 'off',
  },
};
