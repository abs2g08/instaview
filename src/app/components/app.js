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

  onToggle(e) {
    e.preventDefault();

    this.setState({
      drawOpen: !this.state.drawOpen
    });
  };

  closeDraw() {
    if (this.state.drawOpen) {
      this.setState({
        drawOpen: false
      });
    }
  }

  render() {
    const drawOpen = this.state.drawOpen;
    const containerClass = classNames('app', { drawOpen });

    return (
      <div className={containerClass}>
        <div className='pusher'
          onClick={this.closeDraw.bind(this)}>
          <Menu onClick={this.onToggle.bind(this)}/>
          <div className='container content'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
