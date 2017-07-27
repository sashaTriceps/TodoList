import React from 'react';
import { Checkbox, RaisedButton, Paper } from 'material-ui';

export default class CunterBar extends React.Component {
  render() {
    const { counter,  increment, decrement } = this.props;
    return (
      <div >
        <RaisedButton onClick={increment}>+</RaisedButton>
        <p>{counter}</p>
        <RaisedButton onClick={decrement}>-</RaisedButton>
      </div>
    )
  }
}