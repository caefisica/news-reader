import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "unicorn", "oxc", "import", "vue"],
  categories: {
    correctness: "error",
    suspicious: "error",
    pedantic: "warn",
    perf: "warn",
  },
  env: {
    browser: true,
    es2022: true,
  },
  rules: {
    "typescript/no-explicit-any": "error",
    "typescript/no-floating-promises": "error",
    "import/no-duplicates": "error",
    "unicorn/no-array-for-each": "error",
    "unicorn/prefer-node-protocol": "error",
  },
  ignorePatterns: ["dist/**", ".nuxt/**", ".output/**", "node_modules/**", "migrations/**"],
});
