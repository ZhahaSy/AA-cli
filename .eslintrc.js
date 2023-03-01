 module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2022
    },
    extends: [
        "airbnb",
        'prettier'
    ],
    plugins: ['import', 'prettier'],
    rules: {
        'no-console': 'off',
        'import/prefer-default-export': 'off',
        'no-param-reassign': 'off',
        'import/extensions': 'off',
        'no-unused-vars': 'off',
        'no-shadow': 'off',
        'global-require': 'off',
        'no-unused-expressions': 'off',
        'import/no-dynamic-require': 'off',
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            tabWidth: 2,
            indent: 2,
            semi: false,
            printWidth: 120,
            trailingComma: 'all',
            endOfLine: 'auto',
          },
        ],
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', 'svg'],
            moduleDirectory: ['node_modules', 'src/'],
          },
          alias: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', 'svg'],
            map: [['@', './src']],
          },
        },
      },
}
