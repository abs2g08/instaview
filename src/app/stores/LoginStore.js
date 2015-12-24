import alt from '../alt';
import { LoginActions } from '../actions';
import { LoginSource } from '../sources';

/*

user = {
  full_name: "Adam Smith",
  id: "1152301009",
  profile_picture: "https://scontent.cdninstagram.com/hphotos-xta1/t51.2885-19/11939682_495240983967762_1216414350_a.jpg",
  username: "abs2g08"
};

*/

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
