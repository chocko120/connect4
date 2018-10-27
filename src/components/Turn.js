import React from "react";
import { PLAYER_1, PLAYER_2 } from '../constants';

const Turn = ({ row, play, player }) => {
  let styleTurn1 = {
    height: player === PLAYER_2 ? '70px' : '20px',
    width: player === PLAYER_2 ? '70px' : '20px',
  }
  let styleTurn2 = {
    height: player === PLAYER_1 ? '70px' : '20px',
    width: player === PLAYER_1 ? '70px' : '20px',
  }
  return (
    <div className="turn">
      <div className="turn1" style={styleTurn1} />
      <div className="turn2" style={styleTurn2} />
    </div>
  )
};

export default Turn;