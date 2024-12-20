import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        'plugin:react/recommended',
      ],
      parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
      },
      rules: {
        'no-console': 2,
        'ban-ts-ignore': 0,
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/prop-types': 'off',
      },
    },
  },
];
