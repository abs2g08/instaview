import React from 'react';

export default class PleaseLogin extends React.Component {
  render() {
    return (
      <div className='please-login'>
        <span>You need to be logged in to view your feed</span>
        <a className='login'
          href='/authorize_user'>login</a>
      </div>
    );
  }
}
