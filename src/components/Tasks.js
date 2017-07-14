import React from 'react';
import TodoItem from './TodoItem';
import { Paper, TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
import FontAwesome from 'react-fontawesome';
import '../css/Task.css'


class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      sortType: 'All'
    }
  }

  handleSubmit = (e) => {
    const task = this.refs.newTask.input.value;
    this.setState({ 
      todos: this.state.todos.concat(
        { taskName: task, editable: false, checked: false }
      )
    })
    this.refs.newTask.input.value = '';
    const allTask = this.state.todos;
    return allTask;
  }

  deleteItem = (i) => {
    const newTodos = this.state.todos.filter((todo, key) => {
      if (i !== key) return todo;
    })
    this.setState({todos: newTodos});
  }

  showEditor = (e, i, taskName) => {
    const newTodo = this.state.todos[i];
    newTodo.editable = true;
    this.setState({todos: [...this.state.todos, ...newTodo]});
  }

  save = (event, todo) => {
    event.preventDefault();
    todo.taskName = this.refs.newTodo.input.value;
    todo.editable = false;
    
    this.setState({todos: [...this.state.todos, ...todo]})
  }

  checked = (e, todo) => {
    if (todo.checked === false) {
      todo.checked = true;
    } else {
      todo.checked = false;
    }
    this.setState({todos: [...this.state.todos, ...todo]});
    console.log(todo.checked);
  }

  filter = (e) => {
    console.log(e.nativeEvent.target.value);
    this.setState({sortType: e.nativeEvent.target.value})
    const doneTasks = [];
    const notDoneTasks =[];
    this.state.todos.forEach(todo => todo.checked ? doneTasks.push(todo) : notDoneTasks.push(todo) )

    if (this.refs.sortList.value == 'All') {
      this.setState({todos: this.handleSubmit()});
    }

    if (this.refs.sortList.value == 'Done') {
      this.setState({todos: doneTasks});
    } 
    
    if (this.refs.sortList.value == 'Not done') {
      this.setState({todos: notDoneTasks});
    }
    console.log(this.state.todos);
  }

  render = () => {
    const answer = `You don't have any tasks.`;
    const {todos} = this.state;
    return (
      <div className="body" >
        <Paper className="paper" zDepth={3}>
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
                        <TextField ref="newTodo" class="editField" type='text' placeholder={todo.taskName} autoFocus/>
                      </form> 
                    :
                      <div className="item">
                        <TodoItem ref="task"
                                className="item"
                                onClick={() => this.deleteItem(i)} 
                                onChange={(e) => this.checked(e, todo)} onDoubleClick={e => this.showEditor(e, i, todo.taskName)}  
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