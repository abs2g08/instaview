import config from '../../config';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from '../app/routes';
import instagramNode from 'instagram-node';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import Iso from 'iso';

var initAPI = function() {
  api.use({
    client_id: '158b444ca0074028bc72049470c0bc81',
    client_secret: 'a471608714dd4a48b44875d74b4c2f7a'
  });
}

const app = express();
const api = instagramNode.instagram();

const devServer = config.devServer;
const liveReload = config.liveReload;

app.use(cookieParser());

app.use(session({ secret:'somesecrettokenhere'  }));

var redirect_uri = `http://${devServer.host}:${devServer.port}/handleauth`;

initAPI();

exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);

      res.send({
        errorMsg: err.body
      });
    } else {
      console.log(`Yay! Access token is ${result.access_token}`);

      req.session.access_token = result.access_token;
      req.session.user = result.user;
      res.redirect('/home');
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
  console.log(`session: ${req.session.access_token}`);

  if (req.session.access_token) {
    api.use({
      access_token: req.session.access_token
    });

    api.user_self_feed([], function(err, medias, pagination) {
      res.send({
        medias,
        pagination
      });
    });
  } else {
    res.status(403).send({
      errorMsg: 'Please login first'
    });
  }
});

app.get('/search_user', function(req, res) {
  const q = req.query.q;
  api.user_search(q, [], function(err, users) {
    res.send({
      users
    });
  });
});

app.get('/logged_in', function(req, res) {
  if (req.session.access_token) {
    const user = req.session.user;
    res.send({ status: true, user});
  } else {
    res.send({
      status: false,
      user: null
    });
  }
});

app.get('/logout', function(req, res) {
  req.session.access_token = null;
  req.session.user = null;
  initAPI();
  res.redirect('/home');
});

app.get('/*', function(req, res) {
  const location = createMemoryHistory().createLocation(req.url);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const content = renderToString(<RoutingContext {...renderProps} />);
      const iso = new Iso();

      if (req.session.access_token) {
        iso.add(content, {
          isLoggedIn: true,
          user: req.session.user
        });
      } else {
        iso.add(content, {
          isLoggedIn: false,
          user: null
        });
      }

      res.render('index', {
        content: iso.render(),
        liveReload
      });
    } else {
      res.status(404).send({
        errorMsg: 'Not found'
      });
    }
  })
});

var server = app.listen(devServer.port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
