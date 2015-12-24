import React from 'react';
import FeedItem from './FeedItem';
import { HomeActions } from '../actions';

export default class Feed extends React.Component {

  onFeedRefresh() {
    HomeActions.getMyFeed();
  }

  render() {
    const medias = this.props.medias
    //const myUser = this.props.myUser;

    // Hello {myUser.username}

    return (
      <section className='feed'>
        <span className='feed-header'>
        </span>
        <div className='feed-content'>
        {
          medias.map((media, index) => {
            return (
              <FeedItem media={media} key={`feed-item-${index}`}/>
            );
          })
        }
        </div>
        <button onClick={this.onFeedRefresh.bind(this)}>refresh</button>
      </section>
    );
  }
}

Feed.propTypes = {
  medias: React.PropTypes.array,
  myUser: React.PropTypes.object
};
