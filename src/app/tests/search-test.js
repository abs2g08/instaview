import React from 'react';
import { Router } from 'react-router';
import Routes from '../Routes';
import sinon from 'sinon';
import { SearchStore } from '../stores';
import { SearchActions } from '../actions';
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

describe('SearchStore tests', ()=> {
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

  it('should store users: [1, 2, 3] from ajax call', (done)=> {
    SearchActions.searchUser('foo');

    setTimeout(() => server.respond([200, {
      'Content-Type': 'application/json' }, JSON.stringify({ users: [1, 2, 3] })]), 0);

    let count = 0;

    SearchStore.listen(function() {
      const users = SearchStore.getState().users.asMutable();
      if(count === 0) {
        expect(users).toEqual([1,2,3]);
      }

      if(count === 1) {
        expect(users).toEqual([]);
      }
      count++;
      done();
    });
  });
  it('should store error message from failed ajax call', (done)=> {
    SearchActions.searchUser('foo');

    setTimeout(() => server.respond([500, {
      'Content-Type': 'application/json' }, JSON.stringify({ errorMsg: 'bar' })]), 0);

    SearchStore.listen(function() {
      expect(SearchStore.getState().errorMsg).toEqual('bar');
      done();
    });
  });
});

//TO-DO: add more tests for React components
