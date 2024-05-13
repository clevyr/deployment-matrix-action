import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier/recommended";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { ignores: ["dist/**"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginPrettier,
];
