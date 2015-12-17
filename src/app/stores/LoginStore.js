import alt from '../alt';
import { LoginActions } from '../actions';
import { LoginSource } from '../sources';

class LoginStore {
  constructor() {
    this.state = {
      isLoggedIn: false,
      user: null
    };

    this.registerAsync(LoginSource);
    this.bindActions(LoginActions);
  }

  onIsLoggedIn() {
    this.getInstance().isLoggedIn();
  }

  onIsLoggedInSuccess(resp) {
    const data = resp.data;
    this.setState({
      isLoggedIn: data.status,
      user: data.user
    });
  }

  onIsLoggedInError(resp) {
    this.setState({
      errorMsg: resp.data
    });
  }
}

export default alt.createStore(LoginStore);
