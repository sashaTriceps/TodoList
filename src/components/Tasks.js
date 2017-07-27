import React from 'react';
import TodoItem from './TodoItem';
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

  cancelEditor = (e, i, todo) => {
    const todos = this.props.todos.toJS();
    if (this.refs.newTodo.input.value == '') {
      todos[i].taskName = this.refs.newTodo.input.placeholder;
      todos[i].editable = false; 
    } else {
      todos[i].taskName = this.refs.newTodo.input.value;
      todos[i].editable = false;
    }
    const newTodo = todos[i].taskName;
    console.log(newTodo);
    console.log(todos);
    
    if (e.target != this.refs.newTodo) {
      this.props.saveChanges(todos, todo)
      // this.props.cancelEditor(todos, todo);
    }
  }

  save = (event, i, todo) => {
    event.preventDefault();
    const todos = this.props.todos.toJS()

    if (this.refs.newTodo.input.value == '') {
      todos[i].taskName = this.refs.newTodo.input.placeholder;
      todos[i].editable = false; 
    } else {
      todos[i].taskName = this.refs.newTodo.input.value;
      todos[i].editable = false;
    }  
    const newTodo = todos[i].taskName;  
    this.props.saveChanges(todos, todo)
    // this.props.saveEditor(todos, todo);
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
          <div>
            
            { isLoaded === false ? <p className="answer">{loader}</p> :
              todos && todos.size > 0  ?
              isLoaded === false ? <p className="answer">{loader}</p> :
            todos.toJS().map((todo, i, todos) => {
              {/* console.log(todo); */}
              if (currentSortType == 'Done' && todo.checked 
               || currentSortType == 'Not done' && !todo.checked
               || currentSortType == 'All') {
              return (
                <div key={todo.id}>
                  {      
                    todo.editable === true 
                    ? 
                      <form key={todo.id} 
                            className="editItem" 
                            onSubmit={(event) => this.save(event, i, todo)}>
                        <TextField ref="newTodo" 
                                   onBlur={(e) => this.cancelEditor(e, i, todo)} 
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
                                onClick={() => this.deleteItem(todo, i)} 
                                onChange={(e) => this.checked(e, todo, todos)} 
                                onDoubleClick={e => this.showEditor(e, i, todo)}  
                                taskName={todo.taskName}
                                key={todo.id}
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
