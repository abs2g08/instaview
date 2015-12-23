import { HomeActions } from '../actions';
import axios from 'axios';

const HomeSource = {
  getMyFeed: {
    remote() {
      return axios.get('/feed/self');
    },
    success: HomeActions.getMyFeedSuccess,
    error: HomeActions.getMyFeedError
  }
};

export default HomeSource;
