var webpackConfig = require('./webpack.config.dev.js');
webpackConfig.entry = {};

module.exports = function(config) {
  config.set({
    browsers: [ 'Chrome' ],
    singleRun: false,
    frameworks: [ 'mocha' ],
    files: [
      'webpack.tests.js'
    ],

    preprocessors: {
      'webpack.tests.js': ['webpack']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chrome-launcher')
    ]
  });
};
