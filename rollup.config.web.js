import nodeResolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript";

let pkg = require("./package.json");

let sourceMap = process.argv.some(item => item.toLowerCase() === "--dev");

export default {
    entry: "src/index.ts",
    plugins: [
        typescript({ typescript: require("typescript"), target: "es5" }),
        nodeResolve({ jsnext: true, main: true }),
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