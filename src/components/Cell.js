import React, { Component } from "react";
import { PLAYER_1, PLAYER_2, WINNING_SPOT } from '../constants';

class Cell extends Component {

  // Update only changed cells
  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.value !== this.props.value){
      return true;
    } 
    return false;
  }

  render(){
    let color = 'white';
    let {value, player} = this.props;

    if (value === PLAYER_1) {
      color = 'red';
    } else if (value === PLAYER_2) {
      color = 'yellow';
    } else if (value === WINNING_SPOT && player === PLAYER_1){
      color = 'winner1Color';
    } else if (value === WINNING_SPOT && player === PLAYER_2){
      color = 'winner2Color';
    }

    let className = `${color} circle`;

    return (
      <td>
        {false && <div className="cell" onClick={() => {this.props.play(this.props.columnIndex)}}>
          <div className={className}></div>
        </div>}
        <div className="cell" onClick={() => {this.props.play(this.props.columnIndex)}}>
          <div className={className}></div>
        </div>
      </td>
    );
  }
}

export default Cell;