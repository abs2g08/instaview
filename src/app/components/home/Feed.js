import React from 'react';
import FeedItem from './FeedItem';
import { HomeActions } from '../../actions';
import { genKey } from '../../utils/commUtil';
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
    const feedContentClass = classNames(
      'feed-content', { fadeIn: medias.length > 0 }
    );

    return (
      <section className='feed' key='feed-content'>
        <span className='feed-header'>
        </span>
        <div className={feedContentClass}>
        {
          medias.map((media, index)=> {
            let item;
            try {
              item = <FeedItem media={media} key={genKey('feed_item', index)}/>
            } catch(e) {
              item = null;
            }
            return item;
          })
        }
        </div>
        <div className='button-rack'>
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
        </div>
      </section>
    );
  }
}

Feed.propTypes = {
  medias: React.PropTypes.array,
  myUser: React.PropTypes.object
};
