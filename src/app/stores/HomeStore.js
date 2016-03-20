import alt from '../alt';
import { HomeActions } from '../actions';
import { HomeSource } from '../sources';
import { seamlessImmutable } from '../utils/altUtil';
import Immutable from 'seamless-immutable';
import { loading } from '../utils/loadingUtil';
import { redirect403 } from '../utils/httpUtil';

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

@seamlessImmutable
class HomeStore {
  constructor() {
    this.state = Immutable({
      feed: [],

      loading: false,
      errorMsg: ''
    });

    this.registerAsync(HomeSource);
    this.bindActions(HomeActions);
  }

  onGetMyFeed(opts) {
    loading(this);

    this.opts = opts;

    this.getInstance().getMyFeed(opts);
  }

  onGetMyFeedSuccess(resp) {
    const data = resp.data;
    let medias;

    if(this.opts && this.opts.next) {
      medias = this.state.medias.concat(data.medias);
    } else {
      medias = data.medias;
    }

    this.mergeState({
      medias,
      pagination: data.pagination
    });

    this.opts = null;
    loading(this, false);
  }

  onGetMyFeedError(resp) {
    this.mergeState({
      errorMsg: resp.data
    });

    this.opts = null;
    loading(this, false);

    redirect403(resp.status, window);

    throw `onGetMyFeedError error: ${resp.errorMsg}`;
  }
}

export default alt.createStore(HomeStore);
