import React from 'react';
import TodoItem from './TodoItem';
import ChangeItem from './ChangeItem';


class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      todos: [
        
      ]
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let task = this.refs.newTask.value;
    console.log(task);
    this.setState({ 
      todos: this.state.todos.concat(
        { taskName: task }
      )
    })
    this.refs.newTask.value = '';
    this.tasks();
  }

  deleteItem = (i) => {
    const newTodos = this.state.todos.filter((todo, key) => {
      if (i !== key) return todo;
    })
    this.setState({todos: newTodos});
  }

  tasks() {
    console.log(this.state.todos);
  }

  showChangeWindow = () => {
    console.log(true);
    return <ChangeItem/>
  }

  render() {
    var answer = <p>You don't have any tasks.</p>
    console.log(this.state.todos)
    return (
      <div>
        <input ref="newTask"/>
        <input type="submit" value="Add Task" onClick={this.handleSubmit}/>
        <div>
          <ol>
            
            { this.state.todos.length > 0 ?
            this.state.todos.map((todo, i) => {
              return <div><TodoItem index={i} taskName={todo.taskName}/>
                <button onClick={() => this.showChangeWindow()}>Change</button>
                <button onClick={() => this.deleteItem(i)}>Delete</button>
                </div>
            }
            ) : answer }

          </ol>
        </div>
      </div>
    )
  }
}

export default AddTask;