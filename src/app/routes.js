import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';

import {
  HomeView,
  AboutView,
  SearchView
} from './views';

export default (
  <Route path='/'
    component={App}>
    <IndexRoute component={HomeView}/>
    <Route path='home'
      component={HomeView}/>
    <Route path='search'
      component={SearchView}/>
    <Route path='about'
      component={AboutView}/>
  </Route>
);
