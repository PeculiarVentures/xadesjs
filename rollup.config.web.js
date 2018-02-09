import nodeResolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript";

let pkg = require("./package.json");

let sourcemap = process.argv.some(item => item.toLowerCase() === "--dev");

export default {
    input: "src/index.ts",
    output: [
        {
            file: "dist/xades.js",
            format: "umd",
            sourcemap
        }
    ],
    name: "XAdES",
    plugins: [
        typescript({ typescript: require("typescript"), target: "es5" }),
        nodeResolve({ jsnext: true, main: true }),
    ],
};