import React from 'react';
import moment from 'moment';
import urls from '../../const/urls';
import { genKey } from '../../utils/commUtil';
import classNames from 'classnames';
import Comments from './Comments';
import Likes from './Likes';

/*
  attribution: null
  caption: Object
  comments: Object
  created_time: "1442216083"
  filter: "Normal"
  id: "1073708790950208041_36424935"
  images: Object
  likes: Object
  link: "https://www.instagram.com/p/7mlHTkzSIp/"
  location: Object
  tags: Array[0]
  type: "image"
  user: Object
  user_has_liked: false
  users_in_photo: Array[0]
*/

export default class FeedItem extends React.Component {
  getCaption(caption) {
    return (caption ? caption.text : 'this');
  }

  getTimeFromNow(createdTime) {
    const time = moment.unix(createdTime);
    const result = time.isValid() ? time.fromNow() : '';
    return result;
  }

  getImage(image) {
    return (image || { height: 640, url: '', width: 640 });
  }

  getLocation(location) {
    return (location || { name: 'No location', id: '' });
  }

  render() {
    const key = genKey('feed_item', this.props.media.id);
    const media = this.props.media;

    const caption = this.getCaption(media.caption);
    const comments = media.comments.data;

    const createdTime = this.getTimeFromNow(media.created_time);

    //TO-DO: Add linting rule to ensure let does not throw a warning
    const user = media.user;
    user.url = urls.user(user.username);

    const image = this.getImage(media.images.standard_resolution);

    //TO-DO: Add linting rule to ensure let does not throw a warning
    const location = this.getLocation(media.location);
    location.url = urls.explore(location.id);

    const likes = media.likes.data;
    const feedLikesClass = classNames('feed-likes', { hidden: likes.length === 0 });

    return (
      <article className='feed-item' key={key}>
        <header className='feed-item-header'>
            <img className='feed-profimg'
              src={user.profile_picture}
              alt='profile picture'/>
          <div className='feed-meta'>
            <a href={user.url} className='feed-username'>
              {user.username}
            </a>
            <a href={location.url} className='feed-location'>
              {location.name}
            </a>
          </div>
          <span className='feed-time'>{createdTime}</span>
        </header>
        <span>
          <img className='feed-image' src={image.url}
            width={image.width}
            height={image.height}/>
        </span>
        <footer className='feed-item-footer'>
          <div className={feedLikesClass}>
            <Likes likes={likes}/>
            <span className='feed-caption'>
            {` ${caption}` }
            </span>
          </div>
          <Comments comments={comments}/>
        </footer>
      </article>
    );
  }
}

FeedItem.propTypes = {
  media: React.PropTypes.object
};
