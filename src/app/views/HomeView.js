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
    const medias = this.props.homeStore.medias || [];
    const myUser = this.props.loginStore.user || {};
    const loading = this.props.homeStore.loading || false;
    const loggedIn = this.props.loginStore.isLoggedIn;

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
