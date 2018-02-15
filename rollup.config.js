import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import istanbul from 'rollup-plugin-istanbul';

const pkg = require('./package.json');

const plugins = [
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
  external: Object.keys(pkg.dependencies),
  context: 'window',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'lsMap'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ]
};
