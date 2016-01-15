import React from 'react';
import FeedItem from './FeedItem';
import { HomeActions } from '../actions';
import classNames from 'classnames';

export default class Feed extends React.Component {

  onFeedRefresh() {
    HomeActions.getMyFeed();
  }

  onFeedMore() {
    HomeActions.getMyFeed({ next: true });
  }

  render() {
    const medias = this.props.medias || [];
    const buttonClass = classNames({ hidden: medias.length === 0 });

    return (
      <section className='feed' key='feed-content'>
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
        <button
          onClick={this.onFeedRefresh.bind(this)}
          className={buttonClass}>
          refresh
        </button>
        <button
          onClick={this.onFeedMore.bind(this)}
          className={buttonClass}>
          more
        </button>
      </section>
    );
  }
}

Feed.propTypes = {
  medias: React.PropTypes.array,
  myUser: React.PropTypes.object
};
