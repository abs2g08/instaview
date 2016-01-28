import React from 'react';
//import classNames from 'classnames';

export default class UserItem extends React.Component {
  render() {
    const user = this.props.user;

    return(
      <div className='user-item'>
        <figure className='user-fig'>
          <img src={user.profile_picture}/>
        </figure>
        <div className='user-info'>
          <span className='user-name'>
            <h3>{user.username}</h3>
          </span>
          <span className='full-name'>{user.full_name}</span>
        </div>
      </div>
    );
  }
}

UserItem.propTypes = {
  user: React.PropTypes.object
};
