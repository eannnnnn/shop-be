import nestjsTyped from '@darraghor/eslint-plugin-nestjs-typed';
import ts from 'typescript-eslint';
import baseConfig from './base.js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...baseConfig,

  // NestJS 전용 플러그인 기본 설정 (OpenAPI 규칙 제외)
  ...nestjsTyped.configs.flatRecommended,

  // TypeScript-specific configuration for NestJS
  {
    name: 'nest-typescript',
    files: ['**/*.ts'],
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
      // NestJS specific TypeScript rules
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // Allow decorators and dependency injection patterns
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // NestJS에서 자주 사용하는 패턴들 허용
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            // NestJS 관련 약어들 추가 허용
            dto: true,
            req: true,
            res: true,
            ctx: true,
            db: true,
            orm: true,
            api: true,
            auth: true,
            jwt: true,
            config: true,
            env: true,
            dev: true,
            prod: true,
            spec: true,
            e2e: true,
          },
        },
      ],

      // 핵심 NestJS 전용 규칙만 유지 (Nestia 사용으로 OpenAPI 규칙 제외)
      '@darraghor/nestjs-typed/injectable-should-be-provided': 'error',
      '@darraghor/nestjs-typed/param-decorator-name-matches-route-param': 'error',

      // Nestia 사용으로 불필요한 OpenAPI 관련 규칙들 비활성화
      '@darraghor/nestjs-typed/controllers-should-supply-api-tags': 'off',
      '@darraghor/nestjs-typed/api-method-should-specify-api-response': 'off',
      '@darraghor/nestjs-typed/api-property-matches-property-optionality': 'off',
      '@darraghor/nestjs-typed/api-method-should-specify-api-operation': 'off',
      '@darraghor/nestjs-typed/api-enum-property-best-practices': 'off',
      '@darraghor/nestjs-typed/api-property-returning-array-should-set-array': 'off',
    },
  },

  // Test files specific configuration
  {
    name: 'nest-test-files',
    files: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'unicorn/consistent-function-scoping': 'off',
      // 테스트 파일에서는 모든 OpenAPI 관련 규칙 비활성화
      '@darraghor/nestjs-typed/controllers-should-supply-api-tags': 'off',
      '@darraghor/nestjs-typed/api-method-should-specify-api-response': 'off',
      '@darraghor/nestjs-typed/api-property-matches-property-optionality': 'off',
    },
  },
];
