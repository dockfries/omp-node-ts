import { defineConfig } from "@rslib/core";

const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
  lib: [
    {
      source: {
        preEntry: "./src/polyfill.js",
        entry: {
          bundle: "./src/main.ts",
        },
      },
      format: "cjs",
    },
  ],
  output: {
    target: "node",
    sourceMap: {
      js: isDev ? "cheap-module-source-map" : false,
    },
    minify: !isDev,
  },
});
