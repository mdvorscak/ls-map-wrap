var webpack = require('webpack');
var path = require('path');
var entry = 'index';
var outputFile = entry + '.js';
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

var config = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/lib',
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
          options: { esModules: true }
        }],
        enforce: 'post'
      }
    ]
  }
};

module.exports = config;