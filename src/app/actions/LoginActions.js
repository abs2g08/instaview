import alt from '../alt';
import { generateAjaxActions } from '../utils/altUtil';

class LoginActions {
  constructor() {
    generateAjaxActions(this, ['isLoggedIn']);
  }
}

export default alt.createActions(LoginActions);
