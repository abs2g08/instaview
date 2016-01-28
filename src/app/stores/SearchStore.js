import alt from '../alt';
import { SearchActions } from '../actions';
import { SearchSource } from '../sources';
import { redirect403 } from '../utils/httpUtil';

class SearchStore {
  constructor() {
    this.state = {
      users: []
    };

    this.registerAsync(SearchSource);
    this.bindActions(SearchActions);
  }

  onSearchUser(q) {
    this.getInstance().searchUser(q);
  }

  onSearchUserSuccess(resp) {
    this.setState({
      users: resp.data.users
    });
  }

  onSearchUserError(resp) {
    this.setState({
      errorMsg: resp.data.errorMsg
    });

    redirect403(resp.status);

    throw `onSearchUserError error: ${resp.errorMsg}`;
  }
}

export default alt.createStore(SearchStore);
