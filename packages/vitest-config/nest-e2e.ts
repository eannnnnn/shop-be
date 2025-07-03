import { resolve } from 'path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export const config = defineConfig({
  test: {
    globals: true,
    environment: 'node',
    root: './',
    include: ['**/*.e2e-spec.ts', '**/*.e2e-test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/schematics/**', '**/__name__**'],
    setupFiles: ['./test/setup.ts'],
    testTimeout: 30000,
    hookTimeout: 30000,
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
      jsc: {
        parser: {
          syntax: 'typescript',
          decorators: true,
        },
        target: 'es2022',
        transform: {
          legacyDecorator: true,
          decoratorMetadata: true,
        },
      },
    }),
  ],
  esbuild: false, // SWC 사용하므로 esbuild 비활성화
  resolve: {
    alias: {
      // Ensure Vitest correctly resolves TypeScript path aliases
      src: resolve(process.cwd(), './src'),
      test: resolve(process.cwd(), './test'),
    },
  },
});

export default config;
