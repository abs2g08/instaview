import React from 'react';
import moment from 'moment';
import urls from '../const/urls';
import classNames from 'classnames';

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
  renderLikes(likesList) {
    if (likesList > 1) {
      return likesList.map((like, index)=> {
        const username = like.username;
        const url = urls.user(username);
        const count = likesList.length - 1;

        let result;
        if (count !== index) {
          result = <a href={url} className='like'>{username}, </a>;
        } else {
          result = (
            <span>
              and <a href={url} className='like'> {username}</a> likes
            </span>
          );
        }
        return result;
      });
    } else {
      const like = likesList[0];
      const url = urls.user(like.username);
      return (
        <span>
          <a href={url} className='like'>{like.username}</a> likes
        </span>
      );
    }
  }

  render() {
    const id = this.props.media.id;

    let caption = this.props.media.caption;
    caption = caption ? caption.text :  'this';

    let createdTime = this.props.media.created_time;
    createdTime = moment.unix(createdTime).fromNow();

    const user = this.props.media.user;
    user.url = urls.user(user.username);

    let image = this.props.media.images.standard_resolution;
    image = image || { height: 640, url: '', width: 640 };

    let location = this.props.media.location;
    location = location || { name: 'No location', id: '' };
    location.url = urls.explore(location.id);

    const likesList = this.props.media.likes.data;

    const feedLikesClass = classNames('feed-likes', { hidden: likesList.length === 0 })

    return (
      <article className='feed-item' data-id={id}>
        <header className='feed-item-header'>
          <img className='feed-profimg'
            src={user.profile_picture}
            alt=''/>
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
            { this.renderLikes(likesList) }
            <span className='feed-caption'>
            { ` ${caption}` }
            </span>
          </div>
          <div className='feed-comment'></div>
        </footer>
      </article>
    );
  }
}

FeedItem.propTypes = {
  media: React.PropTypes.object
};
