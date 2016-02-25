import alt from '../alt';
import { generateAjaxActions } from '../utils/altUtil';

class SearchActions {
  constructor() {
    generateAjaxActions(this, ['searchUser']);
  }
}

export default alt.createActions(SearchActions);
