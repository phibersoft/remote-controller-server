const nodeExternals = require("webpack-node-externals");
module.exports = {
  mode: "production",
  devtool: "inline-source-map",
  entry: "./server.ts",
  target: "node",
  externals: [nodeExternals(), {
    "robotjs": "commonjs robotjs"
  }],
  output: {
    filename: "bundle.js",
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
};
