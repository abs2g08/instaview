import React from 'react';
import { Link } from 'react-router';

export default class Menu extends React.Component {
  render() {
    return (
      <header className='menu'>

        <Link className='header__logo'
          to='/'>Logo</Link>

        <nav class='menu'>
          <Link to='/home'>home</Link>
          <Link to='/about'>about</Link>
        </nav>

      </header>
    );
  }
}
