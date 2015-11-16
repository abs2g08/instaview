import { homeActions } from '../actions';

export default class HomeStore {

  constructor() {
    this.bindActions(homeActions);
  }

  onGetFeed() {
    return 'hello world';
  }

}
