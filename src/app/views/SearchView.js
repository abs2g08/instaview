import React from 'react';
import { SearchActions } from '../actions';
import { LoginStore, SearchStore } from '../stores';
import { UserItem } from '../components';
import connectToStores from 'alt/utils/connectToStores';
import classNames from 'classnames';

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
    const loading = this.props.searchStore.loading || false;
    const users = this.props.searchStore.users || [];
    const svgLoaderClass = classNames('svg-loader', { hidden: !loading });

    return (
      <div className='search-view'>
        <div className='search-bar'>
          <h3 className='red'>WIP (Work In Progess)</h3>
          <span>Search for users</span>
          <span>{this.props.feed}</span>
          <p>
            <input type='text' name='search' onChange={this.onChange.bind(this)}/>
          </p>
          <p>
            <button onClick={this.onSearch.bind(this)}>search</button>
          </p>
        </div>
        <div className='feed-list'>
          {
            users.map((user, index)=>{
              return (
                <UserItem user={user} key={`user_item${index}`}/>
              );
            })
          }
        </div>
        <div className='search-loader'>
          <span className={svgLoaderClass}></span>
        </div>
      </div>
    );
  }
}

export default connectToStores(SearchView);
