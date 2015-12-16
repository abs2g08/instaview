import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from '../app/routes';
import instagramNode from 'instagram-node';
import createMemoryHistory from 'history/lib/createMemoryHistory';

const app = express();
const api = instagramNode.instagram();

var port = 3000;
var host = 'localhost';

api.use({
  client_id: '158b444ca0074028bc72049470c0bc81',
  client_secret: 'a471608714dd4a48b44875d74b4c2f7a'
});

var redirect_uri = `http://${host}:${port}/handleauth`;

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
      api.use({
        access_token: result.access_token
      });
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

app.get('/search_user', function(req, res) {
  api.user_search('abs2g08', [], function(err, users) {
    res.send({
      users
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

var server = app.listen(port, function() {
  var serverHost = server.address().address;
  var serverPort = server.address().port;

  console.log('Example app listening at http://%s:%s', serverHost, serverPort);
});
