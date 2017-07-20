import React from 'react';
import TodoItem from './TodoItem';
import About from './About';
import Instruction from './Instruction';
import Menu from './Menu';
import { Paper, TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
import FontAwesome from 'react-fontawesome';
import '../css/Task.css'
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();




class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortType: 'All'
    }
  }

  handleSubmit = (e) => {
    const task = this.refs.newTask.input.value;
    this.props.dispatch({ type: 'ADD_TODOS' , payload: { taskName: task, editable: false, checked: false }})
    this.refs.newTask.input.value = '';
  }

  deleteItem = (i) => {
    const newTodos = this.props.todos.filter((todo, key) => {
      if (i !== key) return todo;
    })

    this.props.dispatch({ type: 'REMOVE_ITEM', payload: newTodos});
  }

  showEditor = (e, i, taskName) => {
    const newTodo = this.props.todos[i];
    newTodo.editable = true;
    this.props.dispatch({ type: 'SHOW_EDITOR', payload: newTodo });
  }

  cencelEditor = (e, todo) => {
    if (this.refs.newTodo.input.value == '') {
      todo.taskName = this.refs.newTodo.input.placeholder;
      todo.editable = false; 
    } else {
      todo.taskName = this.refs.newTodo.input.value;
      todo.editable = false;
    }
    
    if (e.target != this.refs.newTodo) {
      this.props.dispatch({ type: 'CENCEL_EDITOR', payload: todo });
    }
  }

  save = (event, todo) => {
    event.preventDefault();
    todo.taskName = this.refs.newTodo.input.value;
    todo.editable = false;
    
    this.props.dispatch({ type: 'SAVE_CHANGES', payload: todo });
  }

  style = {
    textDecoration: 'none'
  }

  checked = (e, todo) => {
    if (todo.checked === false) {
      todo.checked = true;
      this.style.text= 'line-through'
    } else {
      todo.checked = false;
      this.style.text = 'none'
    }
    this.props.dispatch({ type: 'CHECK', payload: todo });
  }

  filter = (e) => {
    this.setState({ sortType: e.nativeEvent.target.value });
  }

  render = () => {

    const answer = `You don't have any tasks.`;
    const { todos } = this.props;
    const { sortType } = this.state;
    return (
      <div className="body" >
        <Paper className="paper" zDepth={3}>
          <Menu className="menu"/>
          <div className="appName">
            <h3 className="name">
              Todo List with React!
            </h3>
          </div>
          <div className="controlField">
              <TextField className="textField" ref="newTask" placeholder="Write your task here."/>
              <RaisedButton className="addButton" primary={true} onClick={e => this.handleSubmit(e)}>Add Task</RaisedButton>
            <select className="select" onChange={this.filter} ref="sortList">
              <option>All</option>
              <option>Done</option>
              <option>Not done</option>
            </select>
          </div> 
          <div>
              
            { todos && todos.length > 0  ?
            todos.map((todo, i) => {
              if (sortType == 'Done' && todo.checked || sortType == 'Not done' && !todo.checked 
               || sortType == 'All') {
              return (
                <div key={i}>
                  {
                    todo.editable === true 
                    ? 
                      <form key={i} className="editItem" onSubmit={(event) => this.save(event, todo)}>
                        <TextField ref="newTodo" onBlur={(e) => this.cencelEditor(e, todo)} className="editField" type='text' autoFocus placeholder={todo.taskName} />
                      </form> 
                    :
                      <div className="item">
                        <TodoItem ref="task"
                                styles={this.style}
                                check={todo.checked}
                                className="item"
                                onClick={() => this.deleteItem(i)} 
                                onChange={(e) => this.checked(e, todo)} 
                                onDoubleClick={e => this.showEditor(e, i, todo.taskName)}  
                                taskName={todo.taskName}
                                key={i}
                        />
                      </div>
                  }
                </div>
              )} else {
                <p className="answer">{answer}</p>
              }
              }
               
            ) : <p className="answer">{answer}</p> }
          </div>
        </Paper>
      </div>
    )
  }
}

export default connect(state => {
  return {
    todos: state.todos
  }
})(AddTask);