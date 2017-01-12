"use strict"

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    "xades": "./src/index.ts"
  },
  output: {
    library: "XAdES",
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts-loader", exclude: path.resolve(__dirname, "node_modules") }
    ]
  },
  node: {
    Buffer: false,
    crypto: false,
  },
  externals: {
    "crypto": "require(\"crypto\");",
    "xmldom-alpha": "require(\"xmldom-alpha\");",
    "xpath.js": "require(\"xpath.js\");",
  }
}