import React from 'react';
import ReactDOM from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AddTask from './components/Tasks';
import About from './components/About';
import Instruction from './components/Instruction';
import Counter from './components/Counter';
import instructionsItem from './components/instructionsItem';

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

ReactDOM.render(
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path='/' component={AddTask}/>
        <Route path='/home' component={AddTask} />
        <Route path='/about' component={About} />
        <Route path='/instruction' component={Instruction} /> 
        <Route path='/instruction/:id' component={instructionsItem} />
      </Router>
    </MuiThemeProvider>,
  document.getElementById('container')
);
