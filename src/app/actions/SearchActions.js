import alt from '../alt';

class SearchActions {
  constructor() {
    this.generateActions(
      'searchUser',
      'searchUserSuccess',
      'searchUserError'
    )
  }
}

export default alt.createActions(SearchActions);
