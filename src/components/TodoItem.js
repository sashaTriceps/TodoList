import React from 'react';

class TodoItem extends React.Component {
  render() {
    const { onDoubleClick, taskName } = this.props;
    return <li onDoubleClick={onDoubleClick}>{taskName}</li>
  }
}

export default TodoItem;