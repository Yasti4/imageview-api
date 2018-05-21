module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  plugins: [
    'html',
    'vue'
  ],
  rules: {
    'no-trailing-spaces': 'off',
    'semi': [2, 'always'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
  },
  globals: {}
}