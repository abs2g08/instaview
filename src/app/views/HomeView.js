import React from 'react';
import { LoginStore, HomeStore } from '../stores';
import { PleaseLogin, Feed } from '../components';
import { HomeActions } from '../actions';
import connectToStores from 'alt/utils/connectToStores';

class HomeView extends React.Component {

  static getStores() {
    return [HomeStore, LoginStore];
  }

  static getPropsFromStores() {
    return {
      homeStore: HomeStore.getState(),
      loginStore: LoginStore.getState()
    };
  }

  componentDidMount() {
    if(this.props.loginStore.isLoggedIn) {
      HomeActions.getMyFeed();
    }
  }

  render() {
    const medias = this.props.homeStore.medias || [];
    const myUser = this.props.loginStore.user || {};

    let content;
    if(this.props.loginStore.isLoggedIn) {
      content = <Feed medias={medias} myUser={myUser}/>
    } else {
      content = <PleaseLogin/>;
    }

    return (
      <div className='home-view'>
        <div>
          {content}
        </div>
      </div>
    );
  }
}

export default connectToStores(HomeView);
