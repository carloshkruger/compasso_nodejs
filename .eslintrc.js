module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['prettier', 'airbnb-base'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-unused-vars': 'off',
    semi: 'off',
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off',
    'no-empty-function': 'off',
    'implicit-arrow-linebreak': 'off',
    'arrow-body-style': 'off',
  },
}
