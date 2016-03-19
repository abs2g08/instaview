import alt from '../alt';
import expect from 'expect';
import { generateAjaxActions, seamlessImmutable } from '../utils/altUtil';
import { getRandomInt, genKey, isomorphicFix} from '../utils/commUtil';
import Immutable from 'seamless-immutable';

describe('alt util tests', ()=> {
  it('should generate actions', (done)=> {
    class FooActions {
      constructor() {
        generateAjaxActions(this, ['bar']);
      }
    }
    const testActions = alt.createActions(FooActions);
    expect(testActions.bar).toExist();
    expect(testActions.barError).toExist();
    expect(testActions.barSuccess).toExist();
    done();
  });
  it('should create immutable store with {a : 2}', (done)=> {
    @seamlessImmutable
    class FooStore {
      constructor() {
        this.state = Immutable({ a: 2});
      }
    }
    const fooStore = alt.createStore(FooStore);
    const store = fooStore.getState();
    expect(store.asMutable().a).toEqual(2);
    done();
  });
});

describe('common util tests', ()=> {
  it('should create a random number between 0 and 10', (done)=> {
    var result = getRandomInt(0, 10);
    expect(result).toExist().toBeGreaterThan(-1).toBeLessThan(11);
    done();
  });
  it('should create a class key in the format class_id_r where r is a random number', (done)=> {
    var key = genKey('test', 0);
    expect(key).toMatch(/test_0_[0-9]{1,4}/);
    done();
  });
  it('should create a list 1,3,2 ', (done)=> {
    var list = [1];
    isomorphicFix(function() {
      list.push(2);
      expect(list).toEqual([1,3,2]);
    });
    list.push(3);
    done();
  });
});
