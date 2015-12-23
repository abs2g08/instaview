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
        <span>This is the home view</span>
        <span>{this.props.feed}</span>
        <span>
          <input type='text'
            name='search'/>
        </span>
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
        <button onClick={this.onSearch.bind(this)}>search</button>
      </div>
    );
  }
}

export default connectToStores(SearchView);
