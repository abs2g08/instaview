var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('./src/config');

var filename = config.filename;

module.exports = {
  entry: [
    './src/client/entry'
  ],
  output: {
    path: __dirname + '/dist/assets',
    filename: filename.app
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, 'src/index.jade'),
      to: path.join(__dirname, '../')
    }]),
    //new webpack.optimize.UglifyJsPlugin(), *doesn't* work with ios package
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin(filename.style, { allChunks: true }),
    new webpack.NoErrorsPlugin()
  ],
  resolve: function() {
    return {
      extensions: ['', '.js']
    };
  },
  eslint: {
    configFile: '.eslintrc',
    failOnError: true
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, 'src/app/styles')]
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
        loaders: ['babel-loader?experimental'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
    ]
  }
};
