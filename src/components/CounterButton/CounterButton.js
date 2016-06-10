/*
NOTE: Hot module reloading doesn't work on this component, seemingly because
of something in connectMultireducer. If that is removed, it works fine.
More discussion here:
https://github.com/erikras/react-redux-universal-hot-example/issues/993

Looks like multireducer is abandoned so probably best not to use it anyhow.
*/

import React, {Component, PropTypes} from 'react';
import {connectMultireducer} from 'multireducer';
import {increment} from 'redux/modules/counter';

@connectMultireducer(
  (key, state) => ({count: state.multireducer[key].count}),
  {increment}
)

export default class CounterButton extends Component {
  static propTypes = {
    count: PropTypes.number,
    increment: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  props = {
    className: ''
  }

  render() {
    const {count, increment} = this.props; // eslint-disable-line no-shadow
    let {className} = this.props;
    className += ' btn btn-default';
    return (
      <button className={className} onClick={increment}>
        You have clicked me {count} time{count === 1 ? '' : 's'}.
      </button>
    );
  }
}
