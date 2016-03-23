import React from 'react';
import { Router } from 'react-router';
import Routes from '../Routes';
import { render, unmountComponentAtNode } from 'react-dom';
import createHistory from 'history/lib/createMemoryHistory';
import expect from 'expect';

let node;

describe('as a User I should be able to navigate to the home page and view its content', ()=> {
  beforeEach(()=> {
    node = document.createElement('div');
  });
  afterEach(()=> {
    unmountComponentAtNode(node)
  })

  it('should render not logged in view without problems', (done)=> {
    render((
      <Router history={createHistory('/')}>
        {Routes}
      </Router>
    ), node, ()=> {
      const text = node
                    .getElementsByClassName('please-login')[0]
                    .getElementsByTagName('p')[0]
                    .textContent;

      expect(text).toEqual('You need to be logged in to view your feed');
      done();
    })
  });

  it('should show home feed when user selects login button', (done)=> {
    /* TO-DO: work out how to do this */
    done();
  });
});
