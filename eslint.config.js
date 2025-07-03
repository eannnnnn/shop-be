// This configuration only applies to the package manager root.
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import("eslint").Linter.Config[]} */
export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    name: 'root-ignores',
    ignores: ['apps/**', 'packages/**', 'node_modules/**', '.turbo/**'],
  },
  {
    name: 'root-files',
    files: ['*.js', '*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Root level specific rules
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
