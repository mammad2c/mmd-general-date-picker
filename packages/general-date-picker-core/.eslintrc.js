module.exports = {
  root: true,
  extends: ['custom'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^h$',
      },
    ],
  },
};
