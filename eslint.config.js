import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist/"] },
  js.configs.recommended,
  {
    files: ["variant-a-game/**/*.js", "variant-b-fireplace/**/*.js"],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  {
    files: ["*.config.js"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    rules: {
      "func-style": ["error", "expression"],
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
    },
  },
  prettier,
];
