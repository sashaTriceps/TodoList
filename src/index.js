import React from 'react';
import ReactDOM from 'react-dom';
import AddTask from './components/Tasks';

ReactDOM.render(
    <div>
      <h3>
        Todo List with React!
      </h3>
      <AddTask />
    </div>,
  document.getElementById('container')
);
