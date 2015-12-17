import alt from '../alt';

class LoginActions {
  constructor() {
    this.generateActions(
      'isLoggedIn',
      'isLoggedInSuccess',
      'isLoggedInError'
    )
  }
}

export default alt.createActions(LoginActions);
