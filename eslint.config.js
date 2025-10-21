// eslint.config.js (Flat config - ESLint v9)
import js from '@eslint/js';
import globals from 'globals';
import pluginImport from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // Arquivos/dirs ignorados (substitui .eslintignore)
  {
    ignores: ['node_modules', 'coverage', 'dist', 'build', '.git', '.husky']
  },

  // Base para código de aplicação (ESM, Node 20)
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node // habilita globals de Node
      }
    },
    plugins: {
      import: pluginImport
    },
    rules: {
      // Regras recomendadas do core
      ...js.configs.recommended.rules,

      // Plugin import (para ESM)
      'import/no-unresolved': 'off', // desative se não usar TS path/alias
      'import/order': ['warn', { 'newlines-between': 'always' }],

      // Boas práticas gerais
      'no-console': 'off',

      // Desativa conflitos com Prettier
      ...eslintConfigPrettier.rules
    }
  },

  // Overrides para testes (Jest)
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest // habilita describe/it/expect
      }
    },
    rules: {
      // regras específicas para testes, se quiser
    }
  }
];
