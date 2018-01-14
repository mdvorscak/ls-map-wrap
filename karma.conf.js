var webpackConfig = require('./webpack.config.js');


module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      'test/**/*.js': ['webpack']
    },
    files: ['test/**/*.js'],
    reporters: ['progress', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: [ 'lcov', 'html' ],
      fixWebpackSourcePaths: true
    },
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