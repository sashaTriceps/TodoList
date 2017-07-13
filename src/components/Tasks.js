import React from 'react';
import TodoItem from './TodoItem';
import FontAwesome from 'react-fontawesome';


class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    }
  }

  handleSubmit = (e) => {
    const task = this.refs.newTask.value;
    this.setState({ 
      todos: this.state.todos.concat(
        { taskName: task, editable: false, checked: false }
      )
    })
    this.refs.newTask.value = '';
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
    todo.taskName = this.refs.newTodo.value;
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
  }

  filter = () => {

    const arr1 = this.state.todos.map((todo) => {
      if (todo.checked === true) {
        return todo;
      }
    });

    const doneTask = [];

    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] != undefined) {
        doneTask.push(arr1[i]);
      }
    }

    const arr2 = this.state.todos.map((todo) => {
      if (todo.checked === false) {
        return todo;
      }
    });

    const notDoneTask = [];

    for (var i = 0; i < arr2.length; i++) {
      if (arr2[i] != undefined) {
        notDoneTask.push(arr2[i]);
      }
    }

    if (this.refs.sortList.value == 'Done') {
      this.setState({todos: doneTask});
    } 
    
    if (this.refs.sortList.value == 'Not done') {
      this.setState({todos: notDoneTask});
    }
  }

  render = () => {
    const answer = `You don't have any tasks.`;
    const {todos} = this.state;
    return (
      <div>
        <input ref="newTask"/>
        <input type="submit" value="Add Task" onClick={e => this.handleSubmit(e)}/>
        <select onChange={() => this.filter()} ref="sortList">
          <option>Select filter</option>
          <option>Done</option>
          <option>Not done</option>
        </select>
        <ol>
            
          { todos.length > 0 ?
          todos.map((todo, i) => {
            return (
              <div>
                {
                  todo.editable === true 
                  ? 
                    <form onSubmit={(event) => this.save(event, todo)}>
                      <input ref="newTodo" type='text' placeholder={todo.taskName} autoFocus/>
                    </form> 
                  :
                    <TodoItem ref="task" onChange={(e) => this.checked(e, todo)} onDoubleClick={e => this.showEditor(e, i, todo.taskName)}  
                          taskName={todo.taskName}
                          key={i}
                    />
                }
                <FontAwesome name='rocket' onClick={() => this.deleteItem(i)}/>
              </div>
            )}
          ) : <p>{answer}</p> }

        </ol>
      </div>
    )
  }
}

export default AddTask;