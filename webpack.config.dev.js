var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var port = '8080';
var host = 'localhost';

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://'+host+':'+port,
    'webpack/hot/only-dev-server',
    './src/client/entry'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'app.js',
    publicPath: 'http://'+host+':'+port+'/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true }),
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
