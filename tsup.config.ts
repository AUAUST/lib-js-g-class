import { defineConfig } from "tsup";

export default defineConfig({
  treeshake: true,
  clean: true,
  minify: true,
  minifyIdentifiers: true,
  minifyWhitespace: true,
  minifySyntax: true,
  terserOptions: {
    compress: true,
  },
});
