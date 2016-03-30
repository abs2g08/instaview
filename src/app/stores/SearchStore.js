import alt from '../alt';
import { SearchActions } from '../actions';
import { SearchSource } from '../sources';
import { seamlessImmutable } from '../utils/altUtil';
import Immutable from 'seamless-immutable';
import { redirect403 } from '../utils/httpUtil';
import { loading } from '../utils/loadingUtil';
import { throwHTTPError } from '../utils/httpUtil';

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
    const errorMsg = resp.data.errorMsg || resp.data;
    this.mergeState({ errorMsg });

    loading(this, false);

    if(resp.status) {
      redirect403(resp.status, window);
    }

    throwHTTPError('onSearchUserError', errorMsg);
  }
}

export default alt.createStore(SearchStore);
