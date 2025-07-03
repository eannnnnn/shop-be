/** @type {import("prettier").Config} */
export default {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  endOfLine: 'auto',
  bracketSpacing: true,
  bracketSameLine: true,
  singleAttributePerLine: false,
  overrides: [{ files: ['**/*.controller.ts'], options: { printWidth: 160 } }],
};
