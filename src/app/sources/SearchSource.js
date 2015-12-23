import { SearchActions } from '../actions';
import axios from 'axios';

const SearchSource = {
  searchUser: {
    remote(state, q) {
      return axios.get('/search_user', { params: { q } });
    },
    success: SearchActions.searchUserSuccess,
    error: SearchActions.searchUserError
  }
};

export default SearchSource;
