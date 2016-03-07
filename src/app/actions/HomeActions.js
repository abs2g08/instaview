import alt from '../alt';
import { generateAjaxActions } from '../utils/altUtil';

class HomeActions {
  constructor() {
    generateAjaxActions(this, ['getMyFeed']);
    this.generateActions('test');
  }
}

export default alt.createActions(HomeActions);
