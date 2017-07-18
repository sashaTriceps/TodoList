import React from 'react';
import Menu from './Menu';
import instructions from './instructionData';
import { Paper, TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';

class About extends React.Component {
  render() {
    console.log(this.props.params);
    console.log(instructions);
    const itemId = this.props.params.id;
    let item;

    for (let i = 0; i < instructions.length; i++) {
      if(instructions[i].id == itemId) {
        item = instructions[i];
        break;
      }
    }
    if (!item) {
        return <h2>error</h2>
      } else {
        return (
          <div className="body" >
            <Paper className="paper" zDepth={3}>
              <Menu className="menu"/>
                <div className="appWrapper">
                  <h3 className="about">
                    {item.name}
                  </h3>
                </div>
                <article className="article">
                  <p>
                    {item.text}
                  </p>
                </article>
            </Paper>
          </div>
        )
      }
  }
}

export default About;