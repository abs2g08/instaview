import React from 'react';
import { SearchActions } from '../actions';
import { LoginStore, SearchStore } from '../stores';
import connectToStores from 'alt/utils/connectToStores';

class SearchView extends React.Component {

  static getStores() {
    return [SearchStore, LoginStore];
  }

  static getPropsFromStores() {
    return {
      searchStore: SearchStore.getState(),
      loginStore: LoginStore.getState()
    };
  }

  onSearch() {
    SearchActions.searchUser('abs2g08');
  }

  render() {
    const users = this.props.searchStore.users || [];

    return (
      <div className='search-view'>
        <h3>WIP (Work In Progess)</h3>
        <span>Search for users</span>
        <span>{this.props.feed}</span>
        <p>
          <input type='text'
            name='search'/>
        </p>
        <p>Users:</p>
        <p className='feed-list'>
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
        </p>
        <p>
          <button onClick={this.onSearch.bind(this)}>search</button>
        </p>
      </div>
    );
  }
}

export default connectToStores(SearchView);
