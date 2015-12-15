import React from 'react';
import { render } from 'react-dom';
import routes from '../app/routes';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import '../app/styles/vendor.scss';

const history = createBrowserHistory();

render(
  <Router history={history}>
    {routes}
  </Router>,
  document.getElementById('app')
)
