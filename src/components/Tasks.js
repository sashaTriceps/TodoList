import React from 'react';
import TodoItem from './TodoItem';
import { Paper, TextField, RaisedButton } from 'material-ui';
import '../css/Task.css'

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      sortType: 'All'
    }
  }

  addTask = () => {
    const taskName = this.refs.newTask.input.value;
    if (taskName.length) {
        this.setState(
            { todos: [...this.state.todos, { taskName, editable: false, checked: false }] }
        );
        this.refs.newTask.input.value = '';
    }
  };

  deleteTask = i => {
    const newTodos = this.state.todos.filter((todo, key) => i !== key ? todo: false);

    this.setState({ todos: newTodos });
  };

  editTask = (e, i) => {
    const newTodo = this.state.todos[i];
    newTodo.editable = true;
    this.setState({ todos: [...this.state.todos, ...newTodo] });
  };

  save = (event, todo) => {
    event.preventDefault();
    todo.taskName = this.refs.newTodo.input.value;
    todo.editable = false;
    
    this.setState({ todos: [...this.state.todos, ...todo] })
  };

  checked = (e, todo) => {
    const { checked } = todo;
    todo.checked = !checked;
    this.setState({ todos: [...this.state.todos, ...todo] });
  };

  filter = e => this.setState({ sortType: e.nativeEvent.target.value });

  sorting = (checked, sortType) => {
    if (sortType === "All") {
        return true;
    } else {
        const sortTypes = { 'Done': checked, 'Not done': !checked };
        return Object.entries(sortTypes).some(arr => arr[0] === sortType && arr[1]);
    }
  };

  render = () => {
    const answer = `You don't have any tasks.`;
    const { todos, sortType } = this.state;

    return (
      <div className="body" >
        <Paper className="paper" zDepth={3}>
          <div className="appName">
            <h3 className="name">Todo List with React!</h3>
          </div>
          <div className="controlField">
            <TextField className="textField" ref="newTask" placeholder="Write your task here."/>
            <RaisedButton className="addButton"
                          onClick={this.addTask}
                          primary
            >
              Add Task
            </RaisedButton>
            <select className="select" onChange={this.filter} ref="sortList">
              <option>All</option>
              <option>Done</option>
              <option>Not done</option>
            </select>
          </div>
          <div>
            {todos.length > 0 ?
            todos.map((todo, i) => {
              const { taskName, checked } = todo;
              return (
                <div>
                  {
                    this.sorting(checked, sortType)
                      ?
                        todo.editable === true
                          ?
                            <form className="editItem" onSubmit={event => this.save(event, todo)}>
                              <TextField ref="newTodo"
                                         class="editField"
                                         type='text'
                                         placeholder={taskName}
                                         autoFocus
                              />
                            </form>
                          :
                            <div className="item">
                              <TodoItem ref="task"
                                        className="item"
                                        onClick={() => this.deleteTask(i)}
                                        onChange={e => this.checked(e, todo)}
                                        onDoubleClick={e => this.editTask(e, i)}
                                        taskName={taskName}
                                        checked={checked}
                                        key={i}
                              />
                            </div>
                      :
                        null
                  }
                </div>)
              }) : <p className="answer">{answer}</p> }
          </div>
        </Paper>
      </div>
    )
  }
}

export default AddTask;