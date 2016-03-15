import React from 'react';
import { LoginStore, HomeStore } from '../stores';
import { PleaseLogin, Feed } from '../components';
import { HomeActions } from '../actions';
import { isomorphicFix } from '../utils/commUtil';
import connectToStores from 'alt/utils/connectToStores';
import classNames from 'classnames';

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
    isomorphicFix(()=> {
      if(this.props.loginStore.isLoggedIn) {
        HomeActions.getMyFeed();
      }
    });
  }

  render() {
    const homeStore = this.props.homeStore.asMutable({ deep: true });
    const loginStore = this.props.loginStore.asMutable({ deep: true });

    const medias = homeStore.medias || [];
    const myUser = loginStore.user || {};
    const loading = homeStore.loading || false;
    const loggedIn = loginStore.isLoggedIn;

    let content;
    if(loggedIn) {
      content = <Feed medias={medias} myUser={myUser}/>
    } else {
      content = <PleaseLogin/>;
    }

    const svgLoaderClass = classNames('svg-loader', { hidden: !loading });

    return (
      <div className='home-view'>
        <div>
          {content}
        </div>
        <div className='home-loader'>
          <svg className={svgLoaderClass}></svg>
        </div>
      </div>
    );
  }
}

export default connectToStores(HomeView);
