import alt from '../alt';
import { HomeActions } from '../actions';
import { HomeSource } from '../sources';
import { loading } from '../utils/loadingUtil';

/*

media = {
  attribution: null,
  caption: Object,
  comments: Object,
  created_time: "1448391722",
  filter: "Mayfair",
  id: "1125513800419451619_36424935",
  images: Object,
  likes: Object,
  link: "https://www.instagram.com/p/-eoNaXzSLj/",
  location: Object,
  tags: Array[0],
  type: "image",
  user: Object,
  user_has_liked: false,
  users_in_photo: Array[0]
};

*/

class HomeStore {
  constructor() {
    this.state = {
      feed: [],

      loading: false,
      errorMsg: ''
    };

    this.registerAsync(HomeSource);
    this.bindActions(HomeActions);
  }

  onGetMyFeed(opts) {
    loading(this);

    this.getInstance().getMyFeed(opts);
  }

  onGetMyFeedSuccess(resp) {
    const data = resp.data;
    this.setState({
      medias: data.medias,
      pagination: data.pagination
    });

    loading(this, false);
  }

  onGetMyFeedError(resp) {
    this.setState({
      errorMsg: resp.data
    });

    loading(this, false);

    throw `onGetMyFeedError error: ${resp.errorMsg}`;
  }
}

export default alt.createStore(HomeStore);
