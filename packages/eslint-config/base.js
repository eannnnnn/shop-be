import js from '@eslint/js';
import importX from 'eslint-plugin-import-x';
import perfectionist from 'eslint-plugin-perfectionist';
import turbo from 'eslint-plugin-turbo';
import unicorn from 'eslint-plugin-unicorn';
import ts from 'typescript-eslint';

/** @type {import("eslint").Linter.Config[]} */
export default [
  // Base configuration for all files
  js.configs.recommended,

  // TypeScript configuration
  ...ts.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js', '*.mjs'],
          defaultProject: './tsconfig.json',
        },
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      // TypeScript-specific overrides
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'off',
    },
  },

  // Turbo monorepo rules
  {
    plugins: {
      turbo,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'error',
    },
  },

  // Essential unicorn rules only (개발 생산성 중심으로 선별)
  {
    plugins: {
      unicorn,
    },
    rules: {
      // 실제로 버그를 방지하는 핵심 규칙들만 선별
      'unicorn/better-regex': 'error',
      'unicorn/catch-error-name': 'error',
      'unicorn/custom-error-definition': 'error',
      'unicorn/error-message': 'error',
      'unicorn/explicit-length-check': 'error',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
            kebabCase: true,
          },
        },
      ],
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-array-push-push': 'error',
      'unicorn/no-console-spaces': 'error',
      'unicorn/no-instanceof-array': 'error',
      'unicorn/no-new-array': 'error',
      'unicorn/no-new-buffer': 'error',
      'unicorn/no-null': 'off', // Allow null in TypeScript
      'unicorn/no-process-exit': 'error',
      'unicorn/no-unnecessary-await': 'error',
      'unicorn/no-useless-promise-resolve-reject': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-array-flat': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/prefer-number-properties': 'error',
      'unicorn/prefer-string-starts-ends-with': 'error',
      'unicorn/prefer-type-error': 'error',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            // 개발에서 흔히 쓰는 약어들 허용
            props: true,
            ref: true,
            params: true,
            args: true,
            env: true,
            dev: true,
            prod: true,
            ctx: true,
            req: true,
            res: true,
            db: true,
            fn: true,
            config: true,
            utils: true,
            spec: true,
            e2e: true,
          },
        },
      ],
      'unicorn/throw-new-error': 'error',
    },
  },

  // Import rules
  {
    plugins: {
      'import-x': importX,
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['tsconfig.json', 'packages/*/tsconfig.json'],
        },
        node: true,
      },
    },
    rules: {
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/no-unresolved': 'error',
      'import-x/no-cycle': 'error',
      'import-x/consistent-type-specifier-style': ['error', 'prefer-inline'],
    },
  },

  // 기본적인 perfectionist 규칙만 (과도하지 않게)
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: ['type', ['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          newlinesBetween: 'always',
        },
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
    },
  },

  // 핵심 코드 품질 규칙들
  {
    rules: {
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-return': 'error',
      'no-console': 'warn',
      'no-empty-function': 'error',
      'prefer-promise-reject-errors': 'error',
    },
  },

  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/.next/**',
      '**/out/**',
      '**/public/**',
      '**/*.min.js',
      '**/*.d.ts',
      '**/pnpm-lock.yaml',
      '**/package-lock.json',
      '**/yarn.lock',
    ],
  },
];
