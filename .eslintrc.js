module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard',
    'standard-jsx',
    'plugin:react/recommended',
    'prettier/react',
    'prettier/standard'
  ],
  plugins: ['react', 'chai-friendly'],
  settings: {
    react: {
      version: '16'
    }
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
    mocha: true
  },

  globals: {
    FileReader: true,
    XMLHttpRequest: true,
    expect: true,
    Element: true,
    jest: true,
    beforeAll: true,
    afterAll: true,
    page: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true
    }
  },
  rules: {
    'react/jsx-sort-props': 1,
    'react/jsx-handler-names': 1,
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true
      }
    ],
    camelcase: 'warn',
    'chai-friendly/no-unused-expressions': [
      2,
      { allowShortCircuit: true, allowTernary: true }
    ],
    'no-unused-expressions': 0,
    'no-console': [1, { allow: ['warn', 'error', 'info'] }],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true
      }
    ],
    'object-curly-spacing': ['error', 'always'],
    'prefer-promise-reject-errors': 'warn',
    'react/jsx-indent': 0,
    'react/no-unused-prop-types': 0, // removed temporaly until having time to fix it
    'react/prop-types': [1, { skipUndeclared: true }],
    'react/no-string-refs': 'warn',
    'react/display-name': 'warn',
    'react/no-find-dom-node': 'warn',
    'react/no-unescaped-entities': 'warn'
  }
}
