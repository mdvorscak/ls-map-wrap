const path = require('path');

const entry = 'index';
const outputFile = entry + '.js';

const config = {
  entry: path.resolve('src/index.js'),
  output: {
    path: path.resolve('lib'),
    filename: outputFile,
    library: 'lsMap',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve('src/'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [require.resolve('babel-preset-env')]
          }
        },
        {
          loader: 'istanbul-instrumenter-loader',
          options: {esModules: true}
        }],
        enforce: 'post'
      }
    ]
  }
};

module.exports = config;
