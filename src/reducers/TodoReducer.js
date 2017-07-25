import Immutable, { Map, List } from 'immutable';
import { ADD_TODOS, REMOVE_ITEM, CHECK, SHOW_EDITOR, CANCEL_EDITOR, SAVE_CHANGES,
CHANGE_SORT_TYPE } from '../actions/TodoListActionsConfig';

const initialState = Map({
  todos: List([]),
  currentSortType: 'All'
});

const TodoReducer = (state = initialState, action) => {

  const todo = state.get('todos').get(action.payload)
  let todos = [];

  if (action.type === CHECK ) {
     todos = state.get('todos').set(action.payload, todo.set('checked', !todo.get('checked') ) )
  }

  switch (action.type) {

    case ADD_TODOS :  return state.update('todos', list =>  list.push(action.payload));
    case REMOVE_ITEM : return state.update('todos', list => action.payload);
    case CHECK : return state.set('todos', todos)
    case SHOW_EDITOR : return state.update('todos', list => action.payload);
    case CANCEL_EDITOR : return state.update('todos', list => action.payload)
    case SAVE_CHANGES : return state.update('todos', list => action.payload);
    case CHANGE_SORT_TYPE : return state.update('currentSortType', list => action.payload);
    default: return state;
  } 
}

export default TodoReducer;