import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {

  componentDidMount() {
    debugger;
  }

  render() {
    return (
      <div>
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
