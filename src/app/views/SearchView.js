import React from 'react';
import { SearchActions } from '../actions';
import { LoginStore, SearchStore } from '../stores';
import connectToStores from 'alt/utils/connectToStores';

class SearchView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: ''
    }
  }

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
    SearchActions.searchUser(this.state.query);
  }

  onChange(e) {
    this.state.query = e.target.value;
  }

  render() {
    const users = this.props.searchStore.users || [];

    return (
      <div className='search-view'>
        <h3>WIP (Work In Progess)</h3>
        <span>Search for users</span>
        <span>{this.props.feed}</span>
        <p>
          <input type='text' name='search' onChange={this.onChange.bind(this)}/>
        </p>
        <p>Users:</p>
        <div className='feed-list'>
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
        <p>
          <button onClick={this.onSearch.bind(this)}>search</button>
        </p>
      </div>
    );
  }
}

export default connectToStores(SearchView);
