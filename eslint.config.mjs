import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.browser, // Aqui você adiciona os globais do navegador
    },
    rules: {
      // Regras para detectar e corrigir erros
      "no-unused-vars": ["warn", { args: "none", ignoreRestSiblings: true }],
      "eqeqeq": ["error", "always"], // Requer uso de `===` ou `!==` ao invés de `==` ou `!=`
      "no-console": "warn", // Previne o uso de `console.log()` em produção
      "semi": ["error", "always"], // Exige o uso de ponto e vírgula
      "quotes": ["error", "single"], // Força o uso de aspas simples
      "indent": ["error", 2], // Exige 2 espaços para indentação
      "no-trailing-spaces": "error", // Proíbe espaços em branco no final das linhas
      "curly": "error", // Exige chaves em torno de blocos de código (se não forem uma única linha)
      "arrow-parens": ["error", "always"], // Exige parênteses em torno de parâmetros de funções, mesmo para uma única variável
      "prefer-const": "error", // Exige `const` quando a variável não for reatribuída
      "no-var": "error", // Impede o uso de `var`, recomenda `let` ou `const`
      "no-undef": "error", // Garante que todas as variáveis sejam definidas
      "no-magic-numbers": ["warn", { ignore: [0, 1] }], // Rejeita números mágicos no código, exceto 0 e 1
      "consistent-return": "error", // Garante que todas as funções com retorno tenham `return` em todos os caminhos
      "prefer-template": "error", // Prefere templates strings ao invés de concatenação com `+`
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
    plugins: ["@eslint/js"],
    extends: [
      pluginJs.configs.recommended, // Mantém as configurações recomendadas do ESLint
    ],
  },
];
