import alt from '../alt';
import { HomeActions } from '../actions';
import { HomeSource } from '../sources';

class HomeStore {
  constructor() {
    this.state = {
      feed: [],
      users: [],
      errorMsg: ''
    };

    this.registerAsync(HomeSource);
    this.bindActions(HomeActions);
  }

  onSearchUser() {
    this.getInstance().searchUser();
  }

  onSearchUserSuccess(resp) {
    this.setState({
      users: resp.users
    });
  }

  onGetMyFeed() {
    this.getInstance().getMyFeed();
  }

  onGetMyFeedSuccess(resp) {
    //debugger;
    this.setState({
      feed: resp.data
    });
  }

  onGetMyFeedError(resp) {
    //debugger;
    this.setState({
      errorMsg: resp.data
    });
  }
}

export default alt.createStore(HomeStore);
