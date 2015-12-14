import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from '../app/routes';
import instagramNode from 'instagram-node';
import createMemoryHistory from 'history/lib/createMemoryHistory';

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

app.get('/feed/self', function(req, res) {
  api.user_self_feed([], function(err, medias, pagination) {
    res.send({
      medias,
      pagination
    });
  });
});

app.get('/*', function(req, res) {
  const location = createMemoryHistory().createLocation(req.url);
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const content = renderToString(<RoutingContext {...renderProps} />);
      res.render('index', { content });
    } else {
      res.status(404).send('Not found')
    }
  })
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
