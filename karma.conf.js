var webpackConfig = require('./webpack.config.js');
webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      'src/index.js': ['webpack'],
      'test/**/*.js': ['webpack']
    },
    files: ['src/index.js', 'test/**/*.js'],
    reporters: ['progress'],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    singleRun: true, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity
  })
}