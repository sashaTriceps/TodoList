import React from 'react';
import Menu from './Menu';
import instructions from './instructionData';
import '../css/Instruction.css';
import { Link } from 'react-router'
import { Paper, TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';

class Instruction extends React.Component {
  render() {
    return (
      <div className="body" >
        <Paper className="paper" zDepth={3}>
          <Menu className="menu"/>
          <div className="appWrap">
            <h3 className="instruction">
              Instructon
            </h3>
          </div>
          <article className="article">
            <p>
              Hello! This is a simple tutorial wich help you to start use my app.
            </p>
            <ul>
              {instructions.map(item => {
                return (
                  <li className="listItem" key={item.id}>
                    <Link className="itemText" to={`/instruction/${item.id}`}>{item.name}</Link>
                  </li>
                )
              })}
            </ul>
          </article>
        </Paper>
      </div>
    )
  }
}

export default Instruction;