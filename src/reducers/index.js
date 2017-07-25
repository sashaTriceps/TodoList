import { combineReducers } from 'redux'
import TodoReducer from './TodoReducer'
import Counter from './CounterReducer'

export default combineReducers({
  TodoReducer,
  Counter
})