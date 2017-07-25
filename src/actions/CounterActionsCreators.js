import React from 'react';
import { ADD_COUNT, DECREMENT_COUNT } from './CounterActionsConfig';


export const addCount = (counter) => {
  return {
    type: ADD_COUNT,
    payload: counter + 1
  }
}

export const decrement = (counter) => {
  return {
    type: DECREMENT_COUNT,
    payload: counter - 1
  }
}