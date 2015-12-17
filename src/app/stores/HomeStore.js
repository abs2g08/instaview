import alt from '../alt';
import { HomeActions } from '../actions';
import { HomeSource } from '../sources';

/*

user = {
  full_name: "Adam Smith",
  id: "1152301009",
  profile_picture: "https://scontent.cdninstagram.com/hphotos-xta1/t51.2885-19/11939682_495240983967762_1216414350_a.jpg",
  username: "abs2g08"
};

*/

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

  onSearchUser(q) {
    this.getInstance().searchUser(q);
  }

  onSearchUserSuccess(resp) {
    this.setState({
      users: resp.data.users
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
