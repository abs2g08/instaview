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
      errorMsg: ''
    };

    this.registerAsync(HomeSource);
    this.bindActions(HomeActions);
  }

  onGetMyFeed() {
    this.getInstance().getMyFeed();
  }

  onGetMyFeedSuccess(resp) {
    const data = resp.data;
    this.setState({
      medias: data.medias,
      pagination: data.pagination
    });
  }

  onGetMyFeedError(resp) {
    this.setState({
      errorMsg: resp.data
    });
  }
}

export default alt.createStore(HomeStore);
