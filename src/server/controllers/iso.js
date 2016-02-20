import React from 'react';
import Iso from 'iso';
import routes from '../../app/routes';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import config from '../../config';

const filename = config.filename;

let network;

if(process.env.NODE_ENV === 'prod') {
  network = config.dist;
} else {
  network = config.liveReload;
}

const index = (req, res)=> {
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
        args: {
          network,
          filename
        },
        content: iso.render()
      });
    }
  })
};

export default {
  index
};
