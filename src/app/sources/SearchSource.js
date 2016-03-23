import { SearchActions } from '../actions';
import axios from 'axios';

const SearchSource = {
  searchUser: {
    remote(state, q) {
      if(!q) {
        throw 'searchUser requires a query string';
      }
      return axios.get('/search_user', { params: { q } });
    },
    success: SearchActions.searchUserSuccess,
    error: SearchActions.searchUserError
  }
};

export default SearchSource;
