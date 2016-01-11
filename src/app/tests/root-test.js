import React from 'react';
import { Router } from 'react-router';
import Routes from '../Routes';
import { render } from 'react-dom'
import createHistory from 'history/lib/createMemoryHistory';
import expect from 'expect';

let node;

describe('root', ()=> {
  beforeEach(()=> {
    node = document.createElement('div');
  });

  it('renders home route without problems', (done) => {
    render((
      <Router history={createHistory('/home')}>
        {Routes}
      </Router>
    ), node, ()=> {
      const text = node.getElementsByClassName('please-login')[0].getElementsByTagName('p')[0].textContent;
      expect(text).toEqual('You need to be logged in to view your feed');
      done()
    })
  });
});

//TO-DO: add more tests for React components
