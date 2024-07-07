import esbuild from "rollup-plugin-esbuild";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import externals from "rollup-plugin-node-externals";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";

const isDev = process.env.NODE_ENV === "dev";

const plugins = [
  externals(),
  nodeResolve(),
  esbuild({ target: "node16.13", sourceMap: isDev, minify: !isDev }),
  typescriptPaths({ preserveExtensions: true }),
  json(),
  commonjs(),
];

export default defineConfig({
  input: "./src/main.ts",
  output: {
    file: "./dist/bundle.js",
    format: "cjs",
    sourcemap: isDev,
    banner: `
      const __module = require("module");
      const __load = __module._load;
      __module._load = function (request) {
        if (request === "process") return global.process;
        return __load.apply(this, arguments);
      };`,
  },
  plugins,
});
