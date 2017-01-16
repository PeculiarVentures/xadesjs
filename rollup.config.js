import typescript from "rollup-plugin-typescript";
import babel from "rollup-plugin-babel";
import babelrc from "babelrc-rollup";

let pkg = require("./package.json");
let external = Object.keys(pkg.dependencies).concat(["xml-core", "pkijs", "asn1js"]);

let sourceMap = process.argv.some(item => item.toLowerCase() === "--dev");

export default {
    entry: "src/index.ts",
    plugins: [
        typescript({ typescript: require("typescript"), target: "es5" }),
        babel(babelrc()),
    ],
    external: external,
    targets: [
        {
            dest: pkg.main,
            format: "umd",
            moduleName: "XAdES",
            sourceMap
        }
    ]
};