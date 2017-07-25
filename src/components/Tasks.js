import React from 'react';
import TodoItem from './TodoItem';
import About from './About';
import Instruction from './Instruction';
import Menu from './Menu';
import { Paper, TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
import FontAwesome from 'react-fontawesome';
import '../css/Task.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCount, decrement } from '../actions/CounterActionsCreators';
import { addTodos, removeTodos, showEditor, cancelEditor, saveEditor,
 checkTask, sorting } from '../actions/TodoListActionsCreators';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class AddTask extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    const task = this.refs.newTask.input.value;
    this.props.addTodos(task);
    this.refs.newTask.input.value = '';
  }

  deleteItem = (i) => {
    const newTodos = this.props.todos.filter((todo, key) => {
      if (i !== key) return todo;
    })

    this.props.removeTodos(newTodos);
  }

  showEditor = (e, i, todo) => {
    const newTodos = this.props.todos.toJS()
    newTodos[i].editable = true;
    this.props.showEditor(newTodos);
  }

  cancelEditor = (e, i) => {
    const newTodos = this.props.todos.toJS();
    if (this.refs.newTodo.input.value == '') {
      newTodos[i].taskName = this.refs.newTodo.input.placeholder;
      newTodos[i].editable = false; 
    } else {
      newTodos[i].taskName = this.refs.newTodo.input.value;
      newTodos[i].editable = false;
    }
    
    if (e.target != this.refs.newTodo) {
      this.props.cancelEditor(newTodos);
    }
  }

  save = (event, i) => {
    event.preventDefault();
    const todos = this.props.todos.toJS()

    if (this.refs.newTodo.input.value == '') {
      todos[i].taskName = this.refs.newTodo.input.placeholder;
      todos[i].editable = false; 
    } else {
      todos[i].taskName = this.refs.newTodo.input.value;
      todos[i].editable = false;
    }    
    this.props.saveEditor(todos);
  }

  style = {
    textDecoration: 'none'
  }

  checked = (e, todo, todos) => { 
  
    if (todo.checked === false) {
      todo.checked = true;
      this.style.text= 'line-through'
    } else {
      todo.checked = false;
      this.style.text = 'none'
    }

    const index = todos.indexOf(todo)

    this.props.checkTask(index);
  }

  filter = (e) => {
    this.props.sorting(e);
  }

  render = () => {
    const answer = `You don't have any tasks.`;
    const { todos, currentSortType, counter } = this.props;
    return (
      <div className="body" >
        <Paper className="paper" zDepth={3}>
          <Menu className="menu"/>
          <div className="count" >
            <RaisedButton onClick={e => this.props.addCount(counter)}>+</RaisedButton>
            <p>{counter}</p>
            <RaisedButton onClick={e => this.props.decrement(counter)}>-</RaisedButton>
          </div>
          <div className="appName">
            <h3 className="name">
              Todo List with React!
            </h3>
          </div>
          <div className="controlField">
              <TextField className="textField" 
                         ref="newTask" 
                         placeholder="Write your task here."/>
              <RaisedButton className="addButton" 
                            primary={true} 
                            onClick={e => this.handleSubmit(e)}>Add Task</RaisedButton>
            <select className="select" 
                    onChange={this.filter} 
                    ref="sortList" 
                    value={this.props.currentSortType}>
              <option>All</option>
              <option>Done</option>
              <option>Not done</option>
            </select>
          </div> 
          <div>
            { todos && todos.size > 0  ?
            todos.toJS().map((todo, i, todos) => {
              console.log(todos, 'fasdf')
              {/* console.log(todo); */}
              if (currentSortType == 'Done' && todo.checked 
               || currentSortType == 'Not done' && !todo.checked
               || currentSortType == 'All') {
              return (
                <div key={i}>
                  {      
                    todo.editable === true 
                    ? 
                      <form key={i} 
                            className="editItem" 
                            onSubmit={(event) => this.save(event, i)}>
                        <TextField ref="newTodo" 
                                   onBlur={(e) => this.cancelEditor(e, i)} 
                                   className="editField" type='text' 
                                   autoFocus 
                                   placeholder={todo.taskName} />
                      </form> 
                    :
                      <div className="item">
                        <TodoItem ref="task"
                                styles={this.style}
                                check={todo.checked}
                                className="item"
                                onClick={() => this.deleteItem(i)} 
                                onChange={(e) => this.checked(e, todo, todos)} 
                                onDoubleClick={e => this.showEditor(e, i, todo)}  
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

export default connect((state) => {
  return {
    todos:            state.TodoReducer.get('todos'),
    currentSortType:  state.TodoReducer.get('currentSortType'),
    counter:          state.Counter.get('counter')
  }
}, dispatch => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    decrement: bindActionCreators(decrement, dispatch),
    addTodos: bindActionCreators(addTodos, dispatch),
    removeTodos: bindActionCreators(removeTodos, dispatch),
    showEditor: bindActionCreators(showEditor, dispatch),
    cancelEditor: bindActionCreators(cancelEditor, dispatch),
    saveEditor: bindActionCreators(saveEditor, dispatch),
    checkTask: bindActionCreators(checkTask, dispatch),
    sorting: bindActionCreators(sorting, dispatch)
  }
})(AddTask);
