import React from 'react';
import ReactDOM from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AddTask from './components/Tasks';
// import './index.css';

ReactDOM.render(
    <MuiThemeProvider>
      <AddTask />
    </MuiThemeProvider>,
  document.getElementById('container')
);
