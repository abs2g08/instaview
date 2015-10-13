var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/client/entry'
  ],
  output: {
    path: __dirname + '/public/js/',
    filename: 'app.js',
    publicPath: 'http://localhost:8080/js/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  eslint: {
    configFile: '.eslintrc',
    failOnError: true
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
      }
    ]
  }
};
