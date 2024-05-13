import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier/recommended";

export default [
  { languageOptions: { globals: globals.browser } },
  { ignores: ["dist/**"] },
  pluginJs.configs.recommended,
  pluginPrettier,
];
