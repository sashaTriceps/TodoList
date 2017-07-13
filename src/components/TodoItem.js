import React from 'react';

class TodoItem extends React.Component {
  render() {
    const { onDoubleClick, onChange, taskName } = this.props;
    return <li onDoubleClick={onDoubleClick}><input onChange={onChange} type="checkbox"/> {taskName}</li>
  }
}

export default TodoItem;