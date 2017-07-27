import Immutable, { Map, List } from 'immutable';
import { ADD_TODOS, REMOVE_ITEM, CHECK, SHOW_EDITOR, CANCEL_EDITOR, SAVE_CHANGES,
CHANGE_SORT_TYPE } from '../actions/TodoListActionsConfig';

const initialState = Map({
  todos: List([]), 
  currentSortType: 'All',
  maxId: 0,
  isLoaded: false
});

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
 
    case ADD_TODOS :  return state.update('todos', list =>  list.unshift(action.payload)).set('isLoaded', action.loaded);
    case 'RECIVING_DATA': return state.set('todos', List(action.payload)).set('isLoaded', action.loaded);
    case 'SET_MAX_ID' : return state.set('maxId', action.payload);
    case REMOVE_ITEM : return state.set('todos', List(action.payload)).set('isLoaded', action.loaded);
    case CHECK : return state.set('todos', List(action.payload));
    case SHOW_EDITOR : return state.update('todos', list => action.payload);
    case 'SAVE_CHANGES': return state.set('todos', List(action.payload)).set('isLoaded', action.loaded);
    case 'GET_TASKS_REQUEST': return state.set('isLoaded', action.payload);
    // case 'GET_TASKS_REQUEST_SUCCESS': return state.set('isLoaded', action.payload);
    case CHANGE_SORT_TYPE : return state.update('currentSortType', list => action.payload);
    default: return state;
  } 
}

export default TodoReducer;