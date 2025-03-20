const { defineConfig } = require('eslint/config');
const xo = require('eslint-config-xo');
const configPrettier = require('eslint-config-prettier/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');

module.exports = defineConfig([
  { ignores: ['app/templates', 'coverage', 'node_modules'] },
  { rules: xo.rules },
  configPrettier,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'avoid',
          printWidth: 90,
          singleQuote: true,
          trailingComma: 'none'
        }
      ]
    }
  }
]);
