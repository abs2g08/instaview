import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getMyFeed',
      'getMyFeedSuccess',
      'getMyFeedError',
      'searchUser',
      'searchUserSuccess',
      'searchUserError'
    )
  }
}

export default alt.createActions(HomeActions);
