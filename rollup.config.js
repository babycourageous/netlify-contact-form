import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

export default {
  input: './src/_assets/javascript/index.js',
  output: {
    file: './_site/javascript/index.js',
    format: 'iife',
    name: 'bundle',
    globals: {
      lodash: '_',
    },
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    production && terser(),
  ],
}
