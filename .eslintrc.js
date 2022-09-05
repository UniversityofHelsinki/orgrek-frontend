module.exports = {
    'env': {
        'node': true,
        'browser': true,
        'es6': true,
        'jest/globals': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        "plugin:cypress/recommended"
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'plugins': [
        'react', 'jest', 'cypress'
    ],
    'rules': {
        'indent': [0, 2],
        'linebreak-style': 0,
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'eqeqeq': 'error',
        'no-unused-vars': 'off',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'complexity': ['error', 20],
        'max-lines-per-function': ['error', 300],
        'max-lines': ['error', 500],
        'no-console': 0,
        'react/prop-types': 0,
        "jest/expect-expect": "off"
    }
};
