import React from 'react';

class TodoItem extends React.Component {
  render() {
    return (
    <div key={this.props.index}>
      <li>{this.props.taskName}</li>
    </div>)
  }
}

export default TodoItem;