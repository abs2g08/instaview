import alt from '../alt';
import { HomeActions } from '../actions';
import { HomeSource } from '../sources';

class HomeStore {
  constructor() {
    this.state = {
      feed: [],
      errorMsg: ''
    };

    this.registerAsync(HomeSource);
    this.bindActions(HomeActions);
  }

  onGetMyFeed() {
    this.getInstance().getMyFeed();
  }

  onGetMyFeedSuccess(resp) {
    //debugger;
    this.setState({
      feed: resp.data
    })
  }

  onGetMyFeedError(resp) {
    //debugger;
    this.setState({
      errorMsg: resp.data
    });
  }
}

export default alt.createStore(HomeStore);
