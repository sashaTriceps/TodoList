import Immutable from 'immutable';
import { ADD_COUNT, DECREMENT_COUNT } from '../actions/CounterActionsConfig';

const initialState = Immutable.fromJS({
  counter: 0
});


const Counter = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNT : return state.set('counter', Immutable.fromJS(action.payload));
    case DECREMENT_COUNT : return state.set('counter', Immutable.fromJS(action.payload));
    default: return state;
  }
}

export default Counter;