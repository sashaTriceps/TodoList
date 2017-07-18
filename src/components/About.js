import React from 'react';
import Menu from './Menu';
import '../css/About.css';
import { Paper, TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';

class About extends React.Component {
  render() {
    return (
      <div className="body" >
        <Paper className="paper" zDepth={3}>
          <Menu className="menu"/>
          <div className="appWrapper">
            <h3 className="about">
              About
            </h3>
          </div>
          <article className="article">
            <p>
              This is a simple Todo list that allows you to add, delete, sort and edit tasks.
            </p>
          </article>
        </Paper>
      </div>
    )
  }
}

export default About;