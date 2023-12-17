module.exports = {
  singleQuote: false,
  semi: false,
  trailingComma: "none",
  printWidth: 100,
  overrides: [
    {
      files: ["**/*.css", "**/*.scss", "**/*.html"],
      options: {
        singleQuote: false
      }
    }
  ]
}
