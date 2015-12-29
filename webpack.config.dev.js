var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./config');

var liveReload = config.liveReload;
var filename = config.filename;

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://'+liveReload.host+':'+liveReload.port,
    //'webpack/hot/only-dev-server', **doesn't** work with ExtractTextPlugin
    'webpack/hot/dev-server',
    './src/client/entry'
  ],
  output: {
    path: __dirname + '/public',
    filename: filename.app,
    publicPath: 'http://'+liveReload.host+':'+liveReload.port+'/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin(filename.style, { allChunks: true }),
    new webpack.NoErrorsPlugin()
  ],
  resolve: function(directory) {
    return {
      extensions: ['', '.js'],
      alias: {
          actions: path.join(directory, 'src/app/actions'),
          components: path.join(directory, 'src/app/components'),
          sources: path.join(directory, 'src/app/sources'),
          stores: path.join(directory, 'src/app/stores'),
          const: path.join(directory, 'src/app/const'),
          views: path.join(directory, 'src/app/views'),
          styles: path.join(directory, 'src/app/styles')
      }
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
        test: /\.svg$/,
        loader: 'file-loader'
      },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader?experimental'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
    ]
  }
};
