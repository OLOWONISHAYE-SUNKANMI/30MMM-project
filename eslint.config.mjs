import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-require-imports": "warn",
    },
    ignorePatterns: [
      "**/node_modules/**",
      "**/.next/**",
      "**/generated/**",
      "**/.vercel/**",
      "**/.vscode/**",
      "**/certificates/**",
      "**/coverage/**",
      "**/__ARCHIVE__/**",
      "**/public/**",
      "**/sample-data/**",
    ],
  }),
];

export default eslintConfig;
