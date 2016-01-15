import { HomeActions } from '../actions';
import axios from 'axios';

const HomeSource = {
  getMyFeed: {
    remote(self, opts={}) {
      let url = '/feed/self';

      if(opts.next) {
        url = `${url}?next=true`;
      }
      return axios.get(url);
    },
    success: HomeActions.getMyFeedSuccess,
    error: HomeActions.getMyFeedError
  }
};

export default HomeSource;
