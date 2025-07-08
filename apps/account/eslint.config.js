import eslintConfigPrettier from 'eslint-config-prettier';

import nestConfig from '../../packages/eslint-config/nest.js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  // Base NestJS configuration
  ...nestConfig,

  eslintConfigPrettier,

  // Project-specific overrides
  {
    files: ['**/*.ts'],
    name: 'api-custom-rules',
    rules: {
      // API specific overrides
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off', // NestJS uses logger but console is common in development
    },
  },

  // Ignore patterns for this specific project
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**', 'vitest.*.ts'],
    name: 'api-ignores',
  },
];
