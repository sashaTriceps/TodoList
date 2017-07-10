import React from 'react';

class ChangeItem extends React.Component {
  render() {
    return (
      <div>
        <input ref="newItem"/>
        <button>Change</button>
      </div>
    )
  }
}

export default ChangeItem;