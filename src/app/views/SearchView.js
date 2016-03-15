import React from 'react';
import { SearchActions } from '../actions';
import { LoginStore, SearchStore } from '../stores';
import { UserItem, Wip } from '../components';
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
    const searchStore = this.props.searchStore.asMutable({ deep: true });
    const loading = searchStore.loading || false;
    const users = searchStore.users || [];
    const svgLoaderClass = classNames('svg-loader', { hidden: !loading });

    return (
      <div className='search-view'>
        <div className='search-bar'>
          <Wip text='This page is a work in progress...'/>
          <span>{this.props.feed}</span>
          <input type='text' name='search' onChange={this.onChange.bind(this)}/>
          <button onClick={this.onSearch.bind(this)}>search</button>
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
          <svg className={svgLoaderClass}></svg>
        </div>
      </div>
    );
  }
}

export default connectToStores(SearchView);
