var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./src/config');
var merge = require('webpack-merge');
var prodWebpackConfig = require('./webpack.config.prod');
var devWebpackConfig = require('./webpack.config.dev');

var filename = config.filename;

/* front-end webpack.config */

var common = {
  entry: [
    './src/client/entry'
  ],
  output: {
    filename: filename.app
  },
  plugins: [
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
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader?experimental&stage=1'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
    ]
  }
};

var config;

console.log('event: '+ process.env.npm_lifecycle_event);

switch(process.env.npm_lifecycle_event) {
case 'build':
  config = merge(common, prodWebpackConfig);
  break;
default:
  config = merge(common, devWebpackConfig);
}

module.exports = config;
