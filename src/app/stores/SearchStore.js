import alt from '../alt';
import { SearchActions } from '../actions';
import { SearchSource } from '../sources';
import { seamlessImmutable } from '../utils/altUtil';
import Immutable from 'seamless-immutable';
import { redirect403 } from '../utils/httpUtil';
import { loading } from '../utils/loadingUtil';

@seamlessImmutable
class SearchStore {
  constructor() {
    this.state = Immutable({
      users: [],

      loading: false,
      errorMsg: ''
    });

    this.registerAsync(SearchSource);
    this.bindActions(SearchActions);
  }

  onSearchUser(q) {
    loading(this);

    if(!q) {
      throw 'onSearchUser requires query string';
    }

    this.mergeState({
      users: []
    });

    this.getInstance().searchUser(q);
  }

  onSearchUserSuccess(resp) {
    this.mergeState({
      users: resp.data.users
    });
    loading(this, false);
  }

  onSearchUserError(resp) {
    this.mergeState({
      errorMsg: resp.data.errorMsg
    });

    loading(this, false);

    redirect403(resp.status);

    //TO-DO: display error message on screen
    throw `onSearchUserError error: ${resp.errorMsg}`;
  }
}

export default alt.createStore(SearchStore);
