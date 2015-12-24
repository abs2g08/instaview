import React from 'react';

export default class PleaseLogin extends React.Component {
  render() {
    return (
      <article className='please-login'>
        <span>You need to be logged in to view your feed</span>
        <div>
          <a className='login'
            href='/authorize_user'>login</a>
        </div>
      </article>
    );
  }
}
