import React from 'react';
import TodoItem from './TodoItem';
import About from './About';
import Instruction from './Instruction';
import Menu from './Menu';
import { Paper, TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
import FontAwesome from 'react-fontawesome';
import '../css/Task.css'




class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      allTodos: [],
    }
  }

  handleSubmit = (e) => {
    const task = this.refs.newTask.input.value;
    this.setState({ 
      todos: this.state.todos.concat(
        { taskName: task, editable: false, checked: false }
      ),
      allTodos: this.state.todos.concat(
        { taskName: task, editable: false, checked: false }
      ),
    })
    this.refs.newTask.input.value = '';
  }

  deleteItem = (i) => {
    const newTodos = this.state.todos.filter((todo, key) => {
      if (i !== key) return todo;
    })
    const newAllTodos = this.state.allTodos.filter((todo, key) => {
      if (i !== key) return todo;
    })
    
    this.setState({
      todos: newTodos,
      allTodos: newAllTodos
    });
  }

  showEditor = (e, i, taskName) => {
    const newTodo = this.state.todos[i];
    newTodo.editable = true;
    this.setState({todos: [...this.state.todos, ...newTodo]});
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
      this.setState({todos: [...this.state.todos, ...todo]});
    }
  }

  save = (event, todo) => {
    event.preventDefault();
    todo.taskName = this.refs.newTodo.input.value;
    todo.editable = false;
    
    this.setState({todos: [...this.state.todos, ...todo]})
  }

  style = {
    textDecoration: 'none'
  }

  checked = (e, todo) => {
    console.log(todo.checked);
    if (todo.checked === false) {
      todo.checked = true;
      this.style.text= 'line-through'
    } else {
      todo.checked = false;
      this.style.text = 'none'
    }
    this.setState({
      todos: [...this.state.todos, ...todo],
      allTodos: [...this.state.todos, ...todo]
    });
    console.log(this.state.allTodos);
  }

  filter = (e) => {
    const doneTasks = [];
    const notDoneTasks =[];
    this.state.todos.forEach(todo => todo.checked ? doneTasks.push(todo) : notDoneTasks.push(todo) )

    if (this.refs.sortList.value == 'All') {
      this.setState({todos: this.state.allTodos});
      console.log(this.state.allTodos);
    }

    if (this.refs.sortList.value == 'Done') {
      this.setState({todos: doneTasks});
    } 
    
    if (this.refs.sortList.value == 'Not done') {
      this.setState({todos: notDoneTasks});
    }
  }

  render = () => {
    const answer = `You don't have any tasks.`;
    const {todos} = this.state;

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
              
            { todos.length > 0 ?
            todos.map((todo, i) => {
              return (
                <div>
                  {
                    todo.editable === true 
                    ? 
                      <form className="editItem" onSubmit={(event) => this.save(event, todo)}>
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
              )}
               
            ) : <p className="answer">{answer}</p> }
          </div>
        </Paper>
      </div>
    )
  }
}

export default AddTask;