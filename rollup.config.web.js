import nodeResolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript";
import babel from "rollup-plugin-babel";
import babelrc from "babelrc-rollup";

let pkg = require("./package.json");

let sourceMap = process.argv.some(item => item.toLowerCase() === "--dev");

export default {
    entry: "src/index.ts",
    plugins: [
        typescript({ typescript: require("typescript"), target: "es5" }),
        nodeResolve({ jsnext: true, main: true }),
        // babel(babelrc()),
    ],
    targets: [
        {
            dest: "dist/xades.js",
            format: "umd",
            moduleName: "XAdES",
            sourceMap
        }
    ]
};