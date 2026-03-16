import js from "@eslint/js";
import globals from "globals";

export default [
  // 基础推荐配置
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // 识别 window, document 等
        ...globals.node, // 识别 process, require 等
      },
    },
    rules: {
      // 1. 禁止使用 console (警告或标红)
      "no-console": "error",

      // 2. 禁止未使用的变量
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],

      // 3. 禁止使用未声明的变量
      "no-undef": "error",

      // 4. 强制使用分号 (可选，根据你 riskwatch 项目习惯调整)
      semi: ["error", "always"],

      // 5. 强制使用双引号 (可选)
      quotes: ["error", "double"],
    },
  },
];
