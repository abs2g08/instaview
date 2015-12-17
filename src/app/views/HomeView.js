import React from 'react';
import { LoginActions, HomeActions } from '../actions';
import { LoginStore, HomeStore } from '../stores';
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
    LoginActions.isLoggedIn();
  }

  onSearch() {
    HomeActions.searchUser('abs2g08');
  }

  onFeed() {
    HomeActions.getMyFeed();
  }

  render() {
    const users = this.props.homeStore.users || [];
    const medias = this.props.homeStore.medias || [];
    const myUser = this.props.loginStore.user || {};

    return (
      <div className='home-view'>
        <span>This is the home view</span>
        <span>{this.props.feed}</span>
        <span>
          <input type='text'
            name='search'/>
        </span>
        <span>my user:</span>
        <div>
          <span>full name: {myUser.full_name}</span>
          <span>user name: {myUser.username}</span>
        </div>
        <span>Users:</span>
        <div>
          {
            users.map((user, index)=>{
              return (
                <div key={`feed_user${index}`}>
                  <span>{user.full_name}</span>
                  <span>
                    <img src={user.profile_picture}/>
                  </span>
                  <span>{user.username}</span>
                </div>
              );
            })
          }
        </div>
        <span>Feed:</span>
        <div>
          {
            medias.map((media, index)=>{
              const user = media.user;
              return (
                <div key={`media_${index}`}>
                  <span>{user.full_name}</span>
                  <span>
                    <img src={user.profile_picture}/>
                  </span>
                  <span>{user.username}</span>
                </div>
              );
            })
          }
        </div>
        <button onClick={this.onSearch.bind(this)}>search</button>
        <button onClick={this.onFeed.bind(this)}>feed</button>
        <a href='/authorize_user'>login</a>
      </div>
    );
  }
}

export default connectToStores(HomeView);
