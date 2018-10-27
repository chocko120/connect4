import React from "react";
import Cell from './Cell';

const Row = ({ row, play, player }) => {
  return (
    <tr>
      {row.map((cell, i) => (
      <Cell key={i} value={cell} columnIndex={i} play={play} player={player}/>))}
    </tr>
  );
};

export default Row;