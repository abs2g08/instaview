import React from 'react';
import urls from '../const/urls';
import { genKey } from '../utils/commUtil';

export default class Likes extends React.Component {
  renderList(likes) {
    return likes.map((like, index)=> {
      const username = like.username;
      const url = urls.user(username);
      const count = (likes.length - 1);
      const key = genKey('like', like.id);

      let result;
      if (count !== index) {
        result = <a href={url} className='like' key={key}>{username}, </a>;
      } else {
        result = (
          <span key={key}>
            and <a href={url} className='like'> {username}</a> likes
          </span>
        );
      }
      return result;
    });
  }
  render() {
    const likes = this.props.likes;
    if (likes.length > 1) {
      return (
        <span>
          {this.renderList(likes)}
        </span>
      );
    } else {
      const like = likes[0];
      const url = urls.user(like.username);
      const key = genKey('like', like.id);

      return (
        <span>
          <a href={url} className='like' key={key}>{like.username}</a> likes
        </span>
      );
    }
  }
}

Likes.propTypes = {
  likes: React.PropTypes.array
};
