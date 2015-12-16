import React from 'react';
import { render } from 'react-dom';
import routes from '../app/routes';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

// App styles
import '../app/components/menu.scss';

// Redundant includes to trigger live reload
import '../app/styles/vendor.scss';
import '../app/styles/variables.scss';
import '../app/styles/app.scss';

const history = createBrowserHistory();

render(
  <Router history={history}>
    {routes}
  </Router>,
  document.getElementById('app')
)
