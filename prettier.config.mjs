/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  semi: true,
  trailingComma: "all",
  printWidth: 80,
  overrides: [
    {
      files: ["*.js", "*.ts", "*.jsx", "*.tsx"],
      options: {
        singleQuote: true,
        jsxSingleQuote: false,
      },
    },
  ],
};

export default config;
