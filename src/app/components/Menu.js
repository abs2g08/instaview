import React from 'react';
import { Link } from 'react-router';

export default class Menu extends React.Component {
  render() {
    const isLoggedIn = this.props.loginStore.isLoggedIn;
    const user = this.props.loginStore.user;

    let login;
    if(isLoggedIn) {
      login = <a className='logout' href='/logout'>logout {user.username}</a>
    } else {
      login = <a className='login' href='/authorize_user'>login</a>
    }

    return (
      <header className='header'>
        <div className='container'>

          <a onClick={this.props.onClick}
            className='header_icon'
            to='/'></a>

          <Link className='header_logo'
            to='/'>Instaview</Link>

          <nav className='menu'>
            <Link to='/home'>home</Link>
            <Link to='/search'>search</Link>
            <Link to='/about'>about</Link>
            {login}
          </nav>

        </div>
      </header>
    );
  }
}

Menu.propTypes = {
  onClick: React.PropTypes.func,
  loginStore: React.PropTypes.bool
};
