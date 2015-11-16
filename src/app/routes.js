import React from 'react';
import { Router, Route } from 'react-router';
import { HomeView, AboutView} from './views';
import App from './components/app';

export default (
  <Router>
    <Route path='/'
        component={App}>
      <Route path='home'
        component={HomeView}/>
      <Route path='about'
        component={AboutView}/>
    </Route>
  </Router>
);
