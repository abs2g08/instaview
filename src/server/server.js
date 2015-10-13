import express from 'express';
import React from 'react';
import Router from 'react-router';
import routes from '../app/routes';
import instagramNode from 'instagram-node'

const app = express();
const api = instagramNode.instagram();

api.use({
  client_id: 'YOUR_CLIENT_ID',
  client_secret: 'YOUR_CLIENT_SECRET'
});

var redirect_uri = 'http://localhost:3000/handleauth';

exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send('Didnt work');
    } else {
      console.log(`Yay! Access token is ${result.access_token}`);
      res.send('You made it!!');
    }
  });
};

// This is where you would initially send users to authorize
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI
app.get('/handleauth', exports.handleauth);

// set up Jade
app.set('views', './');
app.set('view engine', 'jade');

app.get('/*', function(req, res) {
  Router.run(routes, req.url, Handler => {
    const content = React.renderToString(<Handler />);
    res.render('index', { content });
  });
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
