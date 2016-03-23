import alt from '../alt';
import { LoginActions } from '../actions';
import { LoginSource } from '../sources';
import { seamlessImmutable } from '../utils/altUtil';
import Immutable from 'seamless-immutable';

/*

user = {
  full_name: "Adam Smith",
  id: "1152301009",
  profile_picture: "https://scontent.cdninstagram.com/hphotos-xta1/t51.2885-19/11939682_495240983967762_1216414350_a.jpg",
  username: "abs2g08"
};

*/

@seamlessImmutable
class LoginStore {
  constructor() {
    this.state = Immutable({
      isLoggedIn: false,
      user: null
    });

    this.registerAsync(LoginSource);
    this.bindActions(LoginActions);
  }

  onIsLoggedIn() {
    this.getInstance().isLoggedIn();
  }

  onIsLoggedInSuccess(resp) {
    const data = resp.data;

    this.mergeState({
      isLoggedIn: data.status,
      user: data.user
    });
  }

  onIsLoggedInError(resp) {
    this.mergeState({
      errorMsg: resp.data
    });

    //TO-DO: Display error message on screen
    throw `onIsLoggedInError error: ${resp.errorMsg}`;
  }
}

export default alt.createStore(LoginStore);
