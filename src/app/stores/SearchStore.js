import alt from '../alt';
import { SearchActions } from '../actions';
import { SearchSource } from '../sources';

import { redirect403 } from '../utils/httpUtil';
import { loading } from '../utils/loadingUtil';

class SearchStore {
  constructor() {
    this.state = {
      users: [],
      loading: false,
      errorMsg: ''
    };

    this.registerAsync(SearchSource);
    this.bindActions(SearchActions);
  }

  onSearchUser(q) {
    loading(this);
    this.getInstance().searchUser(q);
  }

  onSearchUserSuccess(resp) {
    this.setState({
      users: resp.data.users
    });
    loading(this, false);
  }

  onSearchUserError(resp) {
    this.setState({
      errorMsg: resp.data.errorMsg
    });

    loading(this, false);

    redirect403(resp.status);

    throw `onSearchUserError error: ${resp.errorMsg}`;
  }
}

export default alt.createStore(SearchStore);
