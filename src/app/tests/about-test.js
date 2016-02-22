import React from 'react';
import { Router } from 'react-router';
import Routes from '../Routes';
import { render, unmountComponentAtNode } from 'react-dom';
import createHistory from 'history/lib/createMemoryHistory';
import expect from 'expect';

let node;

describe('as a User I should be able to navigate to the about page and view its content', ()=> {
  beforeEach(()=> {
    node = document.createElement('div');
  });
  afterEach(()=> {
    unmountComponentAtNode(node);
  })

  it('should render the view without problems', (done) => {
    render((
      <Router history={createHistory('/about')}>
        {Routes}
      </Router>
    ), node, ()=> {
      const text = node.getElementsByClassName('about-view')[0].getElementsByTagName('p')[0].textContent;
      expect(text).toEqual('I’m a front-end Web Developer living in Vancouver, BC. I enjoy foosball, reading and coffee ☕️');
      done();
    })
  });
});

//TO-DO: add more tests for React components
