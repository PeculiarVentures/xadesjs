import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const pkg = require('./package.json');

const banner = [].join('\n');
const input = 'src/index.ts';
const external = Object.keys(pkg.dependencies)
  .concat(['events']);

// main
const main = {
  input,
  plugins: [
    typescript({
      check: true,
      clean: true,
      tsconfigOverride: { compilerOptions: { module: 'ES2015' } },
    }),
  ],
  external,
  output: [
    {
      banner,
      file: pkg.main,
      format: 'cjs',
    },
    {
      banner,
      file: pkg.module,
      format: 'es',
    },
  ],
};

const browserExternals = {
  '@xmldom/xmldom': 'self',
  xpath: 'self',
};

const browser = [
  {
    input,
    plugins: [
      resolve({
        mainFields: ['esnext', 'module', 'main'],
        preferBuiltins: true,
      }),
      commonjs(),
      typescript({
        check: true,
        clean: true,
        tsconfigOverride: { compilerOptions: { module: 'es2015' } },
      }),
    ],
    external: Object.keys(browserExternals),
    output: [
      {
        file: pkg.unpkg,
        format: 'es',
        globals: browserExternals,
      },
    ],
  },
  {
    input: pkg.unpkg,
    external: Object.keys(browserExternals),
    plugins: [
      babel({
        babelrc: false,
        runtimeHelpers: true,
        compact: false,
        comments: false,
        presets: [
          ['@babel/env', {
            targets: {
              ie: '11',
              chrome: '60',
            },
            useBuiltIns: 'entry',
            corejs: 3,
          }],
        ],
        plugins: [
          ['@babel/plugin-proposal-class-properties'],
          ['@babel/proposal-object-rest-spread'],
        ],
      }),
    ],
    output: [
      {
        banner,
        file: pkg.unpkg,
        globals: browserExternals,
        format: 'iife',
        name: 'XAdES',
      },
      {
        banner,
        file: pkg.unpkgMin,
        globals: browserExternals,
        format: 'iife',
        name: 'XAdES',
        plugins: [
          terser(),
        ],
      },
    ],
  },
];

export default [
  main,
  ...browser,
];
