import React from 'react';
import { Checkbox, RaisedButton, Paper } from 'material-ui';
import '../css/TodoItem.css'

class TodoItem extends React.Component {
  render() {
    const { onDoubleClick, onClick, onChange, taskName } = this.props;
    return <Paper zDepth={1} className="todoItem" onDoubleClick={onDoubleClick}>
              <div className="textfield">
                <Checkbox className="checker" onCheck={onChange}/>
                <span className="textItem">{taskName}</span>
              </div> 
              <RaisedButton className="deleteBtn" secondary={true} onClick={onClick}>Delete</RaisedButton>
           </Paper>
  }
}

export default TodoItem;