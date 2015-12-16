import React from 'react';
import Menu from './Menu';
import classNames from 'classnames';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawOpen: false
    }
  }

  onClick(e) {
    e.preventDefault();

    this.setState({
      drawOpen: !this.state.drawOpen
    });
  };

  render() {
    const drawOpen = this.state.drawOpen;
    const containerClass = classNames('app', 'container', { drawOpen });

    return (
      <div className={containerClass}>
        <div className='pusher'>
          <Menu onClick={this.onClick.bind(this)}/>
          <div className='content'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
