// .eslintrc.js
module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: true, // Garante que o ESLint procure pelo babel.config.js
    babelOptions: {
      configFile: './babel.config.js', // Caminho para o arquivo de configuração do Babel
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // Adicione outras extensões conforme necessário
  ],
  plugins: ['react'],
  rules: {
    // Suas regras personalizadas
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
