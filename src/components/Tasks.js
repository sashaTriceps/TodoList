import React from 'react';
import Tasks from './renderTasks';
// import TodoItem from './TodoItem';
import Immutable from 'immutable';
import About from './About';
import Instruction from './Instruction';
import Menu from './Menu';
import CounterBar from './renderCounter';
import { Paper, TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
import FontAwesome from 'react-fontawesome';
import '../css/Task.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCount, decrement } from '../actions/CounterActionsCreators';
import { addTodos, removeTodos, showEditor,
 checkTask, sorting, getTodos, getLastId, saveChanges } from '../actions/TodoListActionsCreators';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class AddTask extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const loader = this.props.isLoaded;
    this.props.getTodos(loader)
  }
  
  componentWillUpdate(todo) {
    this.props.getLastId(todo);
  }

  handleSubmit = (e, todo, maxId) => {
    const task = this.refs.newTask.input.value;
    const MaxId = this.props.maxId;
    const loader = this.props.isLoaded;
    this.props.addTodos(task, todo, MaxId, loader);
    console.log(this.props.isLoaded);
    this.refs.newTask.input.value = '';
  }

  deleteItem = (todo, i) => {
    const newTodos = this.props.todos.toJS().filter((task, key) => {
      if (i !== key) {
        return task;
      } 
    })
    console.log(newTodos);

    this.props.removeTodos(newTodos, todo);
  }

  showEditor = (e, i, todo) => {
    const newTodos = this.props.todos.toJS()
    newTodos[i].editable = true;
    this.props.showEditor(newTodos);
  }

  cancelEditor = (e, todo, i, input ) => {
    const todos = this.props.todos.toJS();

    if (input.input.value == '') {
      todos[i].taskName = input.input.placeholder;
      todos[i].editable = false; 
    } else {
      todos[i].taskName = input.input.value;
      todos[i].editable = false;
    }

    const newTodo = todos[i].taskName;
    
    if (e.target != this.refs.newTodo) {
      this.props.saveChanges(todos, todo)
    }
  }

  save = (event, i, todo, input) => {
    event.preventDefault();
    const todos = this.props.todos.toJS()

    if (input.input.value == '') {
      todos[i].taskName = input.input.placeholder;
      todos[i].editable = false; 
    } else {
      todos[i].taskName = input.input.value;
      todos[i].editable = false;
    }  
    const newTodo = todos[i].taskName;  
    this.props.saveChanges(todos, todo)
  }

  style = {
    textDecoration: 'none'
  }

  checked = (e, todo, todos) => { 
    
    console.log(todo.checked);
  
    if (todo.checked === false) {
      todo.checked = true;
      this.style.text= 'line-through'
    } else {
      todo.checked = false;
      this.style.text = 'none'
    }
    console.log(todo.checked);
    console.log(todos);
    this.props.checkTask(todos);
  }

  filter = (e) => {
    this.props.sorting(e);
  }

  render = () => {
    const answer = `You don't have any tasks.`;
    const loader = <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/afb8cb36197347.5713616457ee5.gif'/>
    const { todos, currentSortType, counter, maxId, isLoaded } = this.props;
    return (
      <div className="body" >
        <Paper className="paper" zDepth={3}>
          <Menu className="menu"/>
          <CounterBar className="count"
                      counter={counter}
                      increment={e => this.props.addCount(counter)}
                      decrement={e => this.props.decrement(counter)}
           />
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
                            onClick={e => this.handleSubmit(e, maxId)}>Add Task</RaisedButton>
            <select className="select" 
                    onChange={this.filter} 
                    ref="sortList" 
                    value={this.props.currentSortType}>
              <option>All</option>
              <option>Done</option>
              <option>Not done</option>
            </select>
          </div> 
          <Tasks loader={loader}
                  isLoaded={isLoaded}
                  todos={todos}
                  currentSortType={currentSortType}
                  onSubmit={this.save}
                  onBlur={this.cancelEditor}
                  onClick={(e, todo, i) => this.deleteItem(todo, i)}
                  onChange={this.checked}
                  onDoubleClick={(e, todo, i) => this.showEditor(e, i, todo)}
                  answer={answer}
                  ref1="task"
                  ref2="newTodo"
          /> 
        </Paper>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    todos:            state.TodoReducer.get('todos'),
    currentSortType:  state.TodoReducer.get('currentSortType'),
    maxId:            state.TodoReducer.get('maxId'),
    counter:          state.Counter.get('counter'),
    isLoaded:         state.TodoReducer.get('isLoaded')
  }
}, dispatch => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    decrement: bindActionCreators(decrement, dispatch),
    addTodos: bindActionCreators(addTodos, dispatch),
    removeTodos: bindActionCreators(removeTodos, dispatch),
    showEditor: bindActionCreators(showEditor, dispatch),
    checkTask: bindActionCreators(checkTask, dispatch),
    sorting: bindActionCreators(sorting, dispatch),
    getTodos: bindActionCreators(getTodos, dispatch),
    getLastId: bindActionCreators(getLastId, dispatch), 
    saveChanges: bindActionCreators(saveChanges, dispatch)
  }
})(AddTask);
