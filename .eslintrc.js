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
    semi: 'off',
  },
}
