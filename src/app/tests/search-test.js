import React from 'react';
import { Router } from 'react-router';
import Routes from '../Routes';
import { render, unmountComponentAtNode } from 'react-dom';
import createHistory from 'history/lib/createMemoryHistory';
import expect from 'expect';

let node;

describe('search', ()=> {
  beforeEach(()=> {
    node = document.createElement('div');
  });
  afterEach(()=> {
    unmountComponentAtNode(node);
  })

  it('renders without problems', (done) => {
    render((
      <Router history={createHistory('/search')}>
        {Routes}
      </Router>
    ), node, ()=> {
      const text = node.getElementsByTagName('span')[0].textContent;
      expect(text).toEqual('Search for users');
      done();
    })
  });
});

//TO-DO: add more tests for React components
