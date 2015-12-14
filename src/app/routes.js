import React from 'react';
import { Route } from 'react-router';
import { HomeView, AboutView} from './views';
import App from './components/app';

export default (
  <Route path='/'
      component={App}>
    <Route path='home'
      component={HomeView}/>
    <Route path='about'
      component={AboutView}/>
  </Route>
);
