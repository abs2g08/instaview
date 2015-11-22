import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <ul>
          <li><Link to='/home'>home</Link></li>
          <li><Link to='/about'>about</Link></li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
