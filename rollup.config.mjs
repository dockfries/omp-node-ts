import esbuild from "rollup-plugin-esbuild";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import externals from "rollup-plugin-node-externals";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const isDev = process.env.NODE_ENV === "dev";

const plugins = [
  externals(),
  nodeResolve(),
  esbuild({ sourceMap: isDev, minify: !isDev }),
  typescriptPaths({ preserveExtensions: true }),
  json(),
  commonjs(),
];

export default {
  input: "./src/main.ts",
  output: {
    file: "./dist/bundle.js",
    format: "cjs",
    sourcemap: isDev,
  },
  plugins,
};
