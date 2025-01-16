module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-props-no-spreading': 'off',
    'plugin:react/jsx-runtime': 'off',
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [0, { allow: 'as-needed' }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.ts', '**/*.test.tsx', 'vite.config.ts'],
      },
    ],
    'import/extensions': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts', 'custom.d.ts'],
};
