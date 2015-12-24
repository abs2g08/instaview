import React from 'react';
import classNames from 'classnames';
import { Menu } from './components';
import { LoginStore } from './stores';
import connectToStores from 'alt/utils/connectToStores';

class App extends React.Component {
  static getStores() {
    return [LoginStore];
  }

  static getPropsFromStores() {
    return {
      loginStore: LoginStore.getState()
    };
  }

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
    const loginStore = this.props.loginStore;

    return (
      <div className={containerClass}>
        <div className='pusher'
          onClick={this.closeDraw.bind(this)}>
          <Menu onClick={this.onToggle.bind(this)} loginStore={loginStore}/>
          <div className='container content'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default connectToStores(App);
