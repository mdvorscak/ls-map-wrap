import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import istanbul from 'rollup-plugin-istanbul';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const pkg = require('./package.json');

const plugins = [
  resolve(),
  commonjs(),
  babel(babelrc())
];

if (process.env.BUILD !== 'production') {
  plugins.push(istanbul({
    exclude: ['test/**/*', 'node_modules/**/*']
  }));
}

export default {
  input: 'src/index.js',
  plugins,
  context: 'window',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'lsMap',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ]
};
