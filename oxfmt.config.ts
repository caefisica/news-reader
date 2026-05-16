import { defineConfig } from "oxfmt";

export default defineConfig({
  sortImports: true,
  endOfLine: "lf",
  overrides: [
    {
      files: ["**/*.md"],
      options: {
        printWidth: 80,
        proseWrap: "always",
      },
    },
  ],
});
