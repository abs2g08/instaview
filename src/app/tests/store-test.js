//import alt from '../alt';
import sinon from 'sinon';
import { HomeStore } from '../stores';
import expect from 'expect';
import { HomeActions } from '../actions';

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
      expect(HomeStore.getState().medias).toEqual([1,2,3]);
      done();
    });
  });
});
