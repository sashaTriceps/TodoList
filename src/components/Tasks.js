import React from 'react';
import TodoItem from './TodoItem';


class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      todos: []
    }
  }

  handleSubmit(e) {
    const task = this.refs.newTask.value;
    this.setState({ 
      todos: this.state.todos.concat(
        { taskName: task }
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

  render() {
    var answer = <p>You don't have any tasks.</p>
    return (
      <div>
        <input ref="newTask"/>
        <input type="submit" value="Add Task" onClick={this.handleSubmit}/>
        <div>
          <ol>
            
            { this.state.todos.length > 0 ?
            this.state.todos.map((todo, i) => {
              return <div><TodoItem index={i} taskName={todo.taskName}/>
                <img onClick={() => this.deleteItem(i)} src="http://s1.iconbird.com/ico/0612/49handdrawnicons/w24h241339857695error5.png"/>
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