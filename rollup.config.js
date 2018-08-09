import typescript from "rollup-plugin-typescript";
import builtins from "rollup-plugin-node-builtins";

let pkg = require("./package.json");
let external = Object.keys(pkg.dependencies).concat(["xml-core", "pkijs", "asn1js", "tslib"]);
let sourceMap = process.argv.some(item => item.toLowerCase() === "--dev");

export default {
    input: "src/index.ts",
    plugins: [
        typescript({ typescript: require("typescript"), target: "esnext" }),
        builtins(),
    ],
    external,
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourceMap,
        }
    ]
};