import React from 'react';
import urls from '../../const/urls';
import { genKey } from '../../utils/commUtil';

export default class Comments extends React.Component {
  renderList(comments) {
    return comments.map((comment)=> {
      const text = ` ${comment.text}`;
      const username = comment.from.username;
      const key = genKey('comment', comment.id);
      const url = urls.user(username);

      return (
        <li className='comment-item' key={key}>
          <span>
            <a href={url} className='comment-username'>
              {username}
            </a>
          </span>
          <span className='comment-text'>
            {text}
          </span>
        </li>
      );
    });
  }
  render() {
    const comments = this.props.comments;
    if (comments.length > 0) {
      return (
        <ul className='comment-list' key={'comment_list'}>
          {this.renderList(comments)}
        </ul>
      );
    } else {
      return (
        <div className='hidden'>
          No comments
        </div>
      );
    }
  }
}

Comments.propTypes = {
  comments: React.PropTypes.array
};
