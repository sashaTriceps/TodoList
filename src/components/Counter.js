import React from 'react';
import Menu from './Menu';
import '../css/Counter.css';
import { Paper, TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';

class About extends React.Component {
  render() {
    return (
      <div className="body" >
        <Paper className="paper" zDepth={3}>
          <Menu className="menu"/>
          <div className="counterWrapper">
            <h3 className="counter">
              Counter
            </h3>
          </div>
        </Paper>
      </div>
    )
  }
}

export default About;