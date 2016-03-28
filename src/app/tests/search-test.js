import React from 'react';
import { Router } from 'react-router';
import Routes from '../Routes';
import { render, unmountComponentAtNode } from 'react-dom';
import createHistory from 'history/lib/createMemoryHistory';
import $ from 'jquery';
import expect from 'expect';

let node;

describe('as a User I should be able to navigate to the search page and view its content', ()=> {
  beforeEach(()=> {
    node = document.createElement('div');
  });
  afterEach(()=> {
    unmountComponentAtNode(node);
  })

  it('should render view without problems', (done)=> {
    render((
      <Router history={createHistory('/search')}>
        {Routes}
      </Router>
    ), node, ()=> {
      const text = $(node).find('span')[0];

      //TO-DO: figure out a test
      expect(text).toEqual(text);
      done();
    })
  });
});

//TO-DO: add more tests for React components
