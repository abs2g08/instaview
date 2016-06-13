var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('./src/config');

var filename = config.filename;

/* front-end webpack.config */

module.exports = {
  output: {
    path: path.join(__dirname, 'dist/assets')
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, 'src/index.jade'),
      to: path.join(__dirname, '../')
    }]),
    new webpack.optimize.UglifyJsPlugin({ mangle: false }), // *doesn't* work with ios package
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
