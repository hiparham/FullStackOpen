import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
    rules: {
      eqeqeq: "error",
      "no-unused-vars": {
        error: { caughtErrors: "none" },
      },
    },
  },
  pluginJs.configs.recommended,
];
