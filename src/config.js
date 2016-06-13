/*
  liveReload: sever that hosts compiled js/css assets (used for live reload)
  dist: a mock distribution server
  devServer: a development server that hosts the isomorphic app
*/

module.exports = {
  liveReload: {
    port: 8080,
    host: 'localhost'
  },
  dist: {
    port: 3000,
    host: 'localhost'
  },
  devServer: {
    port: 3000,
    host: 'localhost'
  },
  filename: {
    app: 'app.js',
    style: 'style.css'
  }
};
