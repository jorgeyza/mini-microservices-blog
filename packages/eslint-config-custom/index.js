module.exports = {
  $schema: "https://json.schemastore.org/eslintrc",
  extends: ["next/core-web-vitals", "turbo", "prettier", "plugin:tailwindcss/recommended"],
  plugins: ["tailwindcss"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "tailwindcss/no-custom-classname": "off",
  },
  settings: {
    tailwindcss: {
      callees: ["cn"],
      config: "./apps/client/tailwind.config.js",
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
    },
  ],
};
