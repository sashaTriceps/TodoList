
const initialState = {
  todos: []
};

const TodoReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'ADD_TODOS' :  return {
      todos: [...state.todos, action.payload]
    }
    case 'REMOVE_ITEM' : return {
      todos: action.payload
    }
    case 'CHECK' : return {
      todos: [...state.todos, ...action.payload]
    }
    case 'SHOW_EDITOR' : return {
      todos: [...state.todos, ...action.payload]
    }
    case 'CENCEL_EDITOR' : return {
      todos: [...state.todos, ...action.payload]
    }
    case 'SAVE_CHANGES' : return {
      todos: [...state.todos, ...action.payload]
    }

    default: return state;
  } 
}

export default TodoReducer;