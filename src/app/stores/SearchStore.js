import alt from '../alt';
import { SearchActions } from '../actions';
import { SearchSource } from '../sources';

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
  }
}

export default alt.createStore(SearchStore);
