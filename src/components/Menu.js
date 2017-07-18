import React from 'react';
import { Link } from 'react-router'
import '../css/Menu.css'


class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <Link className="menu-item" to='/' activeClassName='active' onlyActiveOnIndex={true}>TODOlist</Link>
        <Link className="menu-item" to='/instruction' activeClassName='active'>Instruction</Link>
        <Link className="menu-item" to='/about' activeClassName='active'>About</Link>
      </div> 
    )
  }
}

export default Menu;
