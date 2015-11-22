import React from 'react';
import { HomeActions } from '../actions';
import { HomeStore } from '../stores';
import connectToStores from 'alt/utils/connectToStores';

class HomeView extends React.Component {

  static getStores() {
    return [HomeStore];
  }

  static getPropsFromStores() {
    return HomeStore.getState();
  }

  onClick() {
    console.log('test mez');
    HomeActions.getFeed();
  }

  render() {
    return (
      <div className='home-view'>
        <span>This is the home view</span>
        <span>{this.props.feed}</span>
        <button onClick={this.onClick.bind(this)}>click me</button>
        <a href='/authorize_user'>login</a>
      </div>
    );
  }
}

export default connectToStores(HomeView);
