import React from 'react';
import { render } from 'react-dom';
import Routes from '../app/Routes';
import { Router } from 'react-router';
import alt from '../app/alt';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Immutable from 'seamless-immutable';
import Iso from 'iso';

/*
  NOTE: Must load all styles on client side due to the fact
        server side does not render css.
*/

// Favicon
import '../favicon.ico';

// Comp styles
import '../app/components/menu/menu.scss';
import '../app/components/home/feed.scss';
import '../app/components/common/please-login.scss';
import '../app/components/common/wip.scss';
import '../app/components/search/user-item.scss';

// App views
import '../app/views/search-view.scss';

// Redundant includes to trigger live reload
import '../app/styles/vendor.scss';
import '../app/styles/variables.scss';
import '../app/styles/app.scss';

const history = createBrowserHistory();

// boostrap flux stores
Iso.bootstrap((state) => {
  console.log('bootsrapping data...');
  alt.bootstrap(JSON.stringify({
    LoginStore: Immutable({
      isLoggedIn: state.isLoggedIn,
      user: state.user
    })
  }));
});

render(
  <Router history={history}>
    {Routes}
  </Router>,
  document.getElementById('app')
)
