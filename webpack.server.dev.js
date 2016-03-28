var config = require('./src/config');
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.dev');

var liveReload = config.liveReload;

/* front-end webpack.config for live-reload */

var server = new WebpackDevServer(webpack(webpackConfig), {
  // webpack-dev-server options
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  stats: { colors: true }
});

server.listen(liveReload.port, liveReload.host, function() {});
