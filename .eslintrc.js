module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  env: {
    jest: true,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-typescript',
    'plugin:eslint-comments/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'prettier/prettier': 2,
    'import/prefer-default-export': 0,
    'import/no-default-export': 2,
    "react/jsx-props-no-spreading": "off",
  },
  overrides: [
    {
      files: ['./stories/**/*stories*'],
      rules: {
        'import/no-default-export': 0,
      },
    },
  ],
};
