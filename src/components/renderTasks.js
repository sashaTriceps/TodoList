import React from 'react';
import TodoItem from './TodoItem';
import { TextField } from 'material-ui';


export default class Tasks extends React.Component {
  render() {
    const { loader, isLoaded, todos, currentSortType, onSubmit, onBlur, onClick,
            onChange, onDoubleClick, answer, ref1, ref2 } = this.props;
    return (
      <div>     
        { isLoaded === false ? <p className="answer">{loader}</p> :
          todos && todos.size > 0  ?
          isLoaded === false ? <p className="answer">{loader}</p> :
        todos.toJS().map((todo, i, tasks) => {
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
                        onSubmit={e => onSubmit(e, i, todo, this.refs.newTodo)}>
                    <TextField ref='newTodo' 
                                onBlur={e => onBlur(e, todo, i, this.refs.newTodo)} 
                                className="editField" type='text' 
                                autoFocus 
                                placeholder={todo.taskName} />
                  </form> 
                :
                  <div className="item">
                    <TodoItem ref={ref1}
                            styles={this.style}
                            check={todo.checked}
                            className="item"
                            onClick={(e) => onClick(e, todo, i) } 
                            onChange={(e) => onChange(e, todo, tasks)} 
                            onDoubleClick={(e) => onDoubleClick(e, todo, i)}  
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
    )
  }
}

