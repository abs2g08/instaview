import React from 'react';
import moment from 'moment';

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
  render() {
    const caption = this.props.media.caption ? this.props.media.caption.text :  'No caption';

    let createdTime = this.props.media.created_time || '1448027148';
    createdTime = moment.unix(createdTime).fromNow();

    const id = this.props.media.id || null;

    const user = this.props.media.user;

    let image = this.props.media.images.standard_resolution;
    image = image || { height: 640, url: '', width: 640 };

    return (
      <article className='feed-item' data-id={id}>
        <header>
          <span className='feed-caption'>{caption}</span>
          <span className='feed-time'>{createdTime}</span>
          <span className='feed-username'>{user.username}</span>
          <img src={user.profile_picture} alt='' className='feed-profile-img'/>
        </header>
        <span>
          <img className='feed-image' src={image.url}
            width={image.width}
            height={image.height}/>
        </span>
      </article>
    );
  }
}

FeedItem.propTypes = {
  media: React.PropTypes.object
};
