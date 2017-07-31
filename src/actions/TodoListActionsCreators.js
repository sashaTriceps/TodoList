import React from 'react';
import Immutable from 'immutable';
import { ADD_TODOS, REMOVE_ITEM, CHECK, SHOW_EDITOR, CANCEL_EDITOR, SAVE_CHANGES, CHANGE_SORT_TYPE } from './TodoListActionsConfig';


const setLoadFalse = () => ({type: 'GET_TASKS_REQUEST', payload: false})

export const addTodos = (task, todo, MaxId, loader) => {
  return dispatch => {
    const url = 'http://59772a10312bc3001190bfc5.mockapi.io/tasks';
    const options = {
      method: 'POST',
      body: task
    }

    dispatch(setLoadFalse());
    console.log(loader);
    fetch(url, options)
      .then(response => {
        dispatch({type: ADD_TODOS, payload: Immutable.fromJS({ taskName: task, id: String(+MaxId + 1),  editable: false, checked: false }), loaded: true})
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export const getLastId = (todo) => {
  return dispatch => {
    const url = `http://59772a10312bc3001190bfc5.mockapi.io/tasks`;

    fetch(url)
      .then(response => {
        response.json().then(data => {
          const lastId = data[data.length - 1].id
          console.log(lastId);
          dispatch({type: 'SET_MAX_ID', payload: lastId});
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export const getTodos = (loader) => {
  console.log(loader)
  return dispatch => {
    const url = 'http://59772a10312bc3001190bfc5.mockapi.io/tasks';
    dispatch(setLoadFalse())
    fetch(url)
      .then(response => {        
        response.json().then(data => {
          

          const dataArr = data.map((item, i) => {
            return ({ taskName: data[i].taskName, id: data[i].id, editable: false, checked: false })
          })
          
          dispatch({type: 'RECIVING_DATA', payload: Immutable.fromJS(dataArr), loaded: true});
      });
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export const removeTodos = (newTodos, todo) => {
  return dispatch => {
    const url = `http://59772a10312bc3001190bfc5.mockapi.io/tasks/${todo.id}`;
    dispatch(setLoadFalse());
    fetch(url, {method: 'delete'})
      .then(response => {
        response.json().then(json => {
          dispatch({type: REMOVE_ITEM, payload: newTodos, loaded: true})
        })
      })
  }
}

export const showEditor = (newTodos) => {
  return {
    type: SHOW_EDITOR,
    payload: Immutable.List(newTodos)
  }
}

export const saveChanges = (todos, todo) => {
  return dispatch => {
    const url = `http://59772a10312bc3001190bfc5.mockapi.io/tasks/${todo.id}`;
    const options = {
      method: 'PUT',
      body: todo.taskName
    }
    dispatch(setLoadFalse());
    fetch(url, options)
      .then(response => {
        dispatch({type: 'SAVE_CHANGES', payload: Immutable.List(todos), loaded: true});
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export const checkTask = (todos) => {
  return {
    type: CHECK,
    payload: Immutable.fromJS(todos)
  }
}

export const sorting = (e) => {
  return {
    type: CHANGE_SORT_TYPE,
    payload: Immutable.fromJS(e.nativeEvent.target.value)
  }
}