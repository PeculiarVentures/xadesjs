import typescript from "rollup-plugin-typescript";

let pkg = require("./package.json");
let external = Object.keys(pkg.dependencies).concat(["xml-core", "pkijs", "asn1js", "tslib"]);

let sourceMap = process.argv.some(item => item.toLowerCase() === "--dev");

export default {
    input: "src/index.ts",
    plugins: [
        typescript({ typescript: require("typescript") }),
    ],
    external,
    output: [
        {
            file: pkg.module,
            format: "es",
            sourceMap
        }
    ]
};