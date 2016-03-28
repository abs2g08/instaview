var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('./src/config');

var liveReload = config.liveReload;
var filename = config.filename;

/* front-end webpack.config */

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://'+liveReload.host+':'+liveReload.port,
    'webpack/hot/dev-server',
    './src/client/entry'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: filename.app,
    publicPath: 'http://'+liveReload.host+':'+liveReload.port+'/assets/'
  },
  plugins: [
    //new CopyWebpackPlugin **doesn't* work with dev-server
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin(filename.style, { allChunks: true }),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js'],
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
