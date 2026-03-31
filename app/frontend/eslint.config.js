import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import react from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import * as pluginImportX from "eslint-plugin-import-x"
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript"
import reactCompiler from "eslint-plugin-react-compiler";
import sortKeysFix from "eslint-plugin-sort-keys-fix";

export default tseslint.config(
  {
    ignores: [
      "*.config.js",
      "dist",
      "*.json",
      "./src/context/api/apis",
      "./src/context/api/models",
      "./src/context/api/index.ts",
      "./src/context/api/runtime.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs["recommended-latest"],
  reactRefresh.configs.vite,
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  pluginImportX.flatConfigs.react,
  reactCompiler.configs.recommended,
  stylistic.configs.customize({
    arrowParens: true,
    quotes: "double",
    semi: true,
  }),
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module",
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "unused-imports": unusedImports,
      "sort-keys-fix": sortKeysFix,
    },
    rules: {
      "@stylistic/jsx-sort-props": [
        "warn",
        {
          ignoreCase: true,
        },
      ],
      "@stylistic/indent": [
        "warn",
        2,
      ],
      "@stylistic/max-len": [
        "warn",
        200,
      ],
      "@stylistic/array-bracket-newline": [
        "warn",
        { minItems: 3 },
      ],
      "@stylistic/array-element-newline": [
        "warn",
        { minItems: 3 },
      ],
      "@stylistic/curly-newline": [
        "warn",
        {
          minElements: 2,
          consistent: true,
        },
      ],
      "@stylistic/object-curly-newline": [
        "warn",
        {
          minProperties: 2,
          consistent: true,
        },
      ],
      "@stylistic/function-call-spacing": [
        "warn",
        "never",
      ],
      "@stylistic/function-call-argument-newline": [
        "warn",
        "consistent",
      ],
      "@stylistic/function-paren-newline": [
        "warn",
        "consistent",
      ],
      "@stylistic/implicit-arrow-linebreak": [
        "warn",
        "beside",
      ],
      "@stylistic/jsx-props-no-multi-spaces": "warn",
      "@stylistic/jsx-self-closing-comp": "warn",
      "@stylistic/linebreak-style": [
        "error",
        "unix",
      ],
      "@stylistic/newline-per-chained-call": "warn",
      "@stylistic/no-confusing-arrow": "warn",
      "@stylistic/no-extra-semi": "warn",
      "@stylistic/object-property-newline": "warn",
      "@stylistic/switch-colon-spacing": [
        "warn",
        {
          after: true,
          before: false,
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-void": [
        "error",
        { allowAsStatement: true },
      ],
      "sort-keys-fix/sort-keys-fix": ["warn", "asc", {
        caseSensitive: false,
        natural: true,
      }],
      "@typescript-eslint/no-misused-promises": ["error", {checksVoidReturn: false}],
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "after-used",
          "argsIgnorePattern": "^_",
        },
      ],
      "import-x/no-dynamic-require": "warn",
      "import-x/no-nodejs-modules": ["warn", {allow: ["path"]}],
      "import-x/order": ["warn"],
      "import-x/first": ["warn"],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: import.meta.dirname,
        }),
      ],
    },
  },
);
