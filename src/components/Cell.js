import React from "react";
import { PLAYER_1, PLAYER_2, WINNING_SPOT } from '../constants';

const Cell = ({ value, columnIndex, play, player }) => {
  let color = 'white';

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
      <div className="cell" onClick={() => {play(columnIndex)}}>
        <div className={className}></div>
      </div>
    </td>
  );
};


export default Cell;