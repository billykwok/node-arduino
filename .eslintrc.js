module.exports = {
  env: { commonjs: true, amd: true, es6: true, node: true },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    ecmaFeatures: { impliedStrict: true },
  },
  settings: { 'import/resolver': { node: { extensions: ['.js'] } } },
  plugins: ['import', '@babel', 'prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
  rules: { 'consistent-return': 'off', 'max-len': 'off', 'no-console': 'off' },
};
