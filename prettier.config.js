import prettierBase from './packages/eslint-config/prettier-base.js';

/** @type {import("prettier").Config} */
export default {
  ...prettierBase,
  // Ignore Nestia generated SDK files
  ignorePath: '.prettierignore',
};
