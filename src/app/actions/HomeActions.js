import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getMyFeed',
      'getMyFeedSuccess',
      'getMyFeedError'
    )
  }
}

export default alt.createActions(HomeActions);
