import React from 'react';

export default class Wip extends React.Component {
  render() {
    const text = this.props.text;

    return(
      <div className='wip'>
        <i className='wip-icon'></i>
        <div className='wip-info'>{text}</div>
      </div>
    );
  }
}

Wip.propTypes = {
  text: React.PropTypes.string
};
