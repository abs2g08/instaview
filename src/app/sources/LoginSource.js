import { LoginActions } from '../actions';
import axios from 'axios';

const LoginSource = {
  isLoggedIn: {
    remote() {
      return axios.get('/logged_in');
    },
    success: LoginActions.isLoggedInSuccess,
    error: LoginActions.isLoggedInError
  }
};

export default LoginSource;
