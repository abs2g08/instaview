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
    HomeActions.getMyFeed();
    HomeActions.searchUser();
  }

  render() {
    return (
      <div className='home-view'>
        <span>This is the home view</span>
        <span>{this.props.feed}</span>
        <span>
          <input type='text'
            name='search'/>
        </span>
        <button onClick={this.onClick.bind(this)}>click me</button>
        <a href='/authorize_user'>login</a>
      </div>
    );
  }
}

export default connectToStores(HomeView);
