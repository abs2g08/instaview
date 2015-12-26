import React from 'react';

export default class PleaseLogin extends React.Component {
  render() {
    return (
      <article className='please-login'>
        <p>You need to be logged in to view your feed</p>
        <p>
          <a className='login button'
            href='/authorize_user'>login</a>
        </p>
      </article>
    );
  }
}
