var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('./src/config');

var filename = config.filename;

/* front-end webpack.config */

module.exports = {
  entry: [
    './src/client/entry'
  ],
  output: {
    path: path.join(__dirname, 'dist/assets'),
    filename: filename.app
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, 'src/index.jade'),
      to: path.join(__dirname, '../')
    }]),
    new webpack.optimize.UglifyJsPlugin({ mangle: false }), // *doesn't* work with ios package
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin(filename.style, { allChunks: true }),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  eslint: {
    configFile: '.eslintrc',
    failOnError: true
  },
  sassLoader: {
    includePaths: [path.join(__dirname, 'src/app/styles')]
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: path.join(__dirname, 'src'),
        exclude: path.join(__dirname, 'node_modules')
      }
    ],
    loaders: [
      {
        test: /\.ico$/,
        loader: 'url-loader',
        query: { mimetype: 'image/x-icon' }
      },
      {
        test: /\.(svg?|png)$/,
        loader: 'file-loader'
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader?experimental&stage=1'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
    ]
  }
};
