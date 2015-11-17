import alt from '../alt';
import { HomeActions } from '../actions';

class HomeStore {

  constructor() {
    this.state = {
      feed: 'test'
    };

    this.bindActions(HomeActions);
  }

  onGetFeed() {
    console.log('whats up bra');
    this.setState({
      feed: 'mike'
    });
  }

}

export default alt.createStore(HomeStore);
