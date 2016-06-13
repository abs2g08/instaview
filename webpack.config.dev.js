var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('./src/config');

var liveReload = config.liveReload;
var filename = config.filename;

/* front-end webpack.config */

module.exports = {
  entry: [
    'webpack-dev-server/client?http://'+liveReload.host+':'+liveReload.port,
    'webpack/hot/dev-server'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: 'http://'+liveReload.host+':'+liveReload.port+'/assets/'
  },
  devtool: 'inline-source-map',
  plugins: [
    //new CopyWebpackPlugin **doesn't* work with dev-server
    new webpack.HotModuleReplacementPlugin()
  ]
};
