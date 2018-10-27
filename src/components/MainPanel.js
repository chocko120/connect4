import React, { Component } from 'react';
import '../App.css';
import Row from './Row';
import Turn from './Turn';

import { ROWS, COLS, PLAYER_1, PLAYER_2, WINNING_SPOT } from '../constants';

class MainPanel extends Component {

  cellAddedInRow;

  constructor() {
    super();    
    this.state = {
      currentPlayer: null,
      board: [],
      gameOver: false,
      message: '',
    };
    
    // Bind play function to MainPanel component
    this.play = this.play.bind(this);
  }
  
  // Starts new game
  initBoard() {
    // Create a blank ROWS x COLS matrix
    let board = [];
    for (let r = 0; r < ROWS; r++) {
      let row = [];
      for (let c = 0; c < COLS; c++) {
        row.push(null);
      }
      board.push(row);
    }
    this.setState({
      board,
      currentPlayer: PLAYER_1,
      gameOver: false,
      message: '',
    });
  }
  
  togglePlayer() {
    return (this.state.currentPlayer === PLAYER_1) ? PLAYER_2 : PLAYER_1;
  }
  
  play(c) {
    // Did the palyer add a piece to the cell
    let didPlay = false;
    if (!this.state.gameOver) {
      // Place piece on board
      let board = this.state.board;
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = this.state.currentPlayer;
          this.cellAddedInRow = r;
          didPlay = true;
          break;
        }
      }
      
      // Check that a move was actually done
      if (!didPlay){
        return;
      }

      // Check status of board
      let result = this.checkAll(board, this.cellAddedInRow);
      if (result === PLAYER_1) {
        this.setState({ gameOver: true, message: 'Player 1 (red) wins!' });
      } else if (result === PLAYER_2) {
        this.setState({ gameOver: true, message: 'Player 2 (yellow) wins!' });
      } else if (result === 'draw') {
        this.setState({ gameOver: true, message: 'Draw game.' });
      } else {
        this.setState({ currentPlayer: this.togglePlayer()});
      }
    } else {
      this.setState({ message: 'Game over. Please start a new game.' });
    }
  }
  
  checkVertical(board, cellAddedInRow) {
    // Check only when the piece was added to a high enough cell
    if (cellAddedInRow > 2){
      return null;
    }
    // Check only if row is 3 or greater
    for (let r = 3; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c] &&
              board[r][c] === board[r - 2][c] &&
              board[r][c] === board[r - 3][c]) {
            let result = board[r][c];
            board[r][c] = WINNING_SPOT;
            board[r-1][c] = WINNING_SPOT;
            board[r-2][c] = WINNING_SPOT;
            board[r-3][c] = WINNING_SPOT;
            return result;   
          }
        }
      }
    }
  }
  
  checkHorizontal(board) {
    // Check only if column is 3 or less
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r][c + 1] && 
              board[r][c] === board[r][c + 2] &&
              board[r][c] === board[r][c + 3]) {
            let result = board[r][c];
            board[r][c] = WINNING_SPOT;
            board[r][c+1] = WINNING_SPOT;
            board[r][c+2] = WINNING_SPOT;
            board[r][c+3] = WINNING_SPOT;
            return result;
          }
        }
      }
    }
  }
  
  checkDiagonalRight(board, cellAddedInRow) {
    // Check only when the piece was added to a high enough cell
    if (cellAddedInRow > 2){
      return null;
    }
    console.log('Now checking');
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = 3; r < ROWS; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c + 1] &&
              board[r][c] === board[r - 2][c + 2] &&
              board[r][c] === board[r - 3][c + 3]) {
            let result = board[r][c];
            board[r][c] = WINNING_SPOT;
            board[r-1][c+1] = WINNING_SPOT;
            board[r-2][c+2] = WINNING_SPOT;
            board[r-3][c+3] = WINNING_SPOT;
            return result;
          }
        }
      }
    }
  }
  
  checkDiagonalLeft(board, cellAddedInRow) {
    // Check only when the piece was added to a high enough cell
    if (cellAddedInRow > 2){
      return null;
    }
    console.log('Now checking');
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = 3; r < ROWS; r++) {
      for (let c = 3; c < COLS; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c - 1] &&
              board[r][c] === board[r - 2][c - 2] &&
              board[r][c] === board[r - 3][c - 3]) {
            let result = board[r][c];
            board[r][c] = WINNING_SPOT;
            board[r-1][c-1] = WINNING_SPOT;
            board[r-2][c-2] = WINNING_SPOT;
            board[r-3][c-3] = WINNING_SPOT;
            return result;
          }
        }
      }
    }
  }
  
  checkDraw(board, cellAddedInRow) {
    // Check only when the piece was added to a highest cell possible
    if (cellAddedInRow !== 0){
      return null;
    }
    console.log('Now checking draw');
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!board[r][c]) {
          return null;
        }
      }
    }
    return 'draw';    
  }
  
  // Check for win
  checkAll(board, cellAddedInRow) {
    return this.checkVertical(board, cellAddedInRow) || 
           this.checkHorizontal(board) || 
           this.checkDiagonalRight(board, cellAddedInRow) || 
           this.checkDiagonalLeft(board, cellAddedInRow) || 
           this.checkDraw(board, cellAddedInRow);
  }
  
  componentDidMount() {
    this.initBoard();
  }
  
  render() {
    // Get the next player for Turn Component
    let player = this.state.currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    return (
      <div>
        <h1>Connect 4</h1>
        <div className="button" onClick={() => {this.initBoard();}}>New Game</div>
        <Turn player={player}/>
        <table>
          <tbody>
            {this.state.board.map((row, i) => (
              <Row key={i} row={row} play={this.play} player={this.state.currentPlayer}/>
            ))}
          </tbody>
        </table>
        <p className="message">{this.state.message}</p>
      </div>
    );
  }
}

export default MainPanel;
