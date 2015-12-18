import React from 'react';
import { Link } from 'react-router';

export default class Menu extends React.Component {
  render() {
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
            <Link to='/about'>about</Link>
          </nav>

        </div>
      </header>
    );
  }
}

Menu.propTypes = {
  onClick: React.PropTypes.func
};
