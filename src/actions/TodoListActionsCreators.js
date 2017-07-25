import React from 'react';
import Immutable from 'immutable';
import { ADD_TODOS, REMOVE_ITEM, CHECK, SHOW_EDITOR, CANCEL_EDITOR, SAVE_CHANGES, CHANGE_SORT_TYPE } from './TodoListActionsConfig';


export const addTodos = (task) => {
  return {
    type: ADD_TODOS,
    payload: Immutable.fromJS({ taskName: task, editable: false, checked: false })
  }
}

export const removeTodos = (newTodos) => {
  return {
    type: REMOVE_ITEM,
    payload: Immutable.List(newTodos)
  }
}

export const showEditor = (newTodos) => {
  return {
    type: SHOW_EDITOR,
    payload: Immutable.List(newTodos)
  }
}

export const cancelEditor = (newTodos) => {
  return {
    type: CANCEL_EDITOR,
    payload: Immutable.List(newTodos)
  }
}

export const saveEditor = (todos) => {
  return {
    type: SAVE_CHANGES,
    payload: Immutable.List(todos)
  }
}

export const checkTask = (index) => {
  return {
    type: CHECK,
    payload: index
  }
}

export const sorting = (e) => {
  return {
    type: CHANGE_SORT_TYPE,
    payload: Immutable.fromJS(e.nativeEvent.target.value)
  }
}