import React from 'react';
import ReactDOM from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AddTask from './components/Tasks';
import About from './components/About';
import Instruction from './components/Instruction';
import instructionsItem from './components/instructionsItem';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { logger } from './enhancers/logger'

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/' component={AddTask}/>
          <Route path='/home' component={AddTask} />
          <Route path='/about' component={About} />
          <Route path='/instruction' component={Instruction} /> 
          <Route path='/instruction/:id' component={instructionsItem} />
        </Router>
      </Provider>
    </MuiThemeProvider>,
  document.getElementById('container')
);
