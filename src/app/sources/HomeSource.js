import { HomeActions } from '../actions';
import axios from 'axios';

const HomeSource = {
  getMyFeed: {
    remote() {
      return axios.get('/feed/self');
    },
    success: HomeActions.getMyFeedSuccess,
    error: HomeActions.getMyFeedError
  },
  searchUser: {
    remote() {
      return axios.get('/search_user');
    },
    success: HomeActions.searchUserSuccess,
    error: HomeActions.searchUserError
  }
};

export default HomeSource;
