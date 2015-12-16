import React from 'react';
import Menu from './Menu';

export default class App extends React.Component {
  render() {
    return (
      <div className='app row medium-8 large-7 columns'>
        <Menu/>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
