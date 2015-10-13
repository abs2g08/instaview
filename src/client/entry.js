import React from 'react';
import Router from 'react-router';
import routes from '../app/routes';

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler/>, document.getElementById('app'));
});
