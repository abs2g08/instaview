import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getFeed',
    )
  }
}

export default alt.createActions(HomeActions);
