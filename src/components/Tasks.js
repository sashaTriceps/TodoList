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
        { taskName: task, editable: false }
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

  save = () => {
    console.log(this.state.todos);
    const task = input.value;
    
    this.setState({todos: [...this.state.todos, ...task]})
  }

  render = () => {
    const answer = `You don't have any tasks.`;
    const {todos} =this.state;
    return (
      <div>
        <input ref="newTask"/>
        <input type="submit" value="Add Task" onClick={e => this.handleSubmit(e)}/>
          <ol>
            
          { todos.length > 0 ?
          todos.map((todo, i) => {
            return (
              <div>
                {
                  todo.editable === true 
                  ? 
                    <form onSubmit={() => this.save()}>
                      <input type='text' placeholder={todo.taskName} autoFocus/>
                    </form> 
                  :
                    <TodoItem ref="task" onDoubleClick={e => this.showEditor(e, i, todo.taskName)}  
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