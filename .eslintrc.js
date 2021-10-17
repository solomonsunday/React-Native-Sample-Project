module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'global-require': [0],
    // 'no-underscore-dangle': [0],
    // 'react/forbid-prop-types': [0],
    // 'react/require-default-props': [0],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-props-no-spreading': [0],
    'react/prop-types': [0],
    'no-unused-vars': 'warn',
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      fragment: 'Fragment',
      version: '16.13',
      // flowVersion: '0.53', // Flow version
    },
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
          ['assets', './src/assets'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
