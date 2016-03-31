import React from 'react';
import { Router } from 'react-router';
import Routes from '../Routes';
import sinon from 'sinon';
import { HomeStore } from '../stores';
import { HomeActions } from '../actions';
import { render, unmountComponentAtNode } from 'react-dom';
import createHistory from 'history/lib/createMemoryHistory';
import $ from 'jquery';
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
      const text = $(node).find('p')[0].innerHTML;
      expect(text).toEqual('You need to be logged in to view this page');
      done();
    })
  });

  it('should show home feed when user selects login button', (done)=> {
    /* TO-DO: work out how to do this */
    done();
  });
});

describe('HomeStore tests', ()=> {
  let sandbox;
  let server;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    server = sandbox.useFakeServer();
  });
  afterEach(() => {
    server.restore();
    sandbox.restore();
  });

  it('should store medias: [1, 2, 3] from ajax call', (done)=> {
    HomeActions.getMyFeed();

    setTimeout(() => server.respond([200, {
      'Content-Type': 'application/json' }, JSON.stringify({ medias: [1, 2, 3] })]), 0);

    HomeStore.listen(function() {
      const medias = HomeStore.getState().medias.asMutable();
      expect(medias).toEqual([1,2,3]);
      done();
    });
  });
  it('should store error message from failed ajax call', (done)=> {
    HomeActions.getMyFeed();

    setTimeout(() => server.respond([500, {
      'Content-Type': 'application/json' }, JSON.stringify({ errorMsg: 'bar' })]), 0);

    HomeStore.listen(function() {
      expect(HomeStore.getState().errorMsg).toEqual('bar');
      done();
    });
  });
});
