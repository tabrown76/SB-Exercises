import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=3, ncols=3 }) {
  const [board, setBoard] = useState(createBoard());
  const [gameOver, setGameOver] = useState(false);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = new Array(nrows)
      .fill()
      .map(() => new Array(ncols)
        .fill(false));

    let clicks = Math.floor(Math.random() * 6) + 5;  // Between 5 and 10

    for (let i = 0; i < clicks; i++) {
      let y = Math.floor(Math.random() * nrows);
      let x = Math.floor(Math.random() * ncols);
      flipCellsDirectly(`${y}-${x}`, initialBoard);
    }

    return initialBoard;
  }

  function flipCellsDirectly(coord, board) {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
          const moves = [
            [0, -1],  // Move left
            [0, 1],   // Move right
            [-1, 0],  // Move up
            [1, 0]    // Move down
          ];

          if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
              boardCopy[y][x] = !boardCopy[y][x];

              for (let move of moves) {
                  const newY = y + move[0];
                  const newX = x + move[1];

                  if (newX >= 0 && newX < ncols && newY >= 0 && newY < nrows) {
                      boardCopy[newY][newX] = !boardCopy[newY][newX];
                  }
              }          
          }
      };

      flipCell(y, x, board);
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        const moves = [
          [0, -1],  // Move left
          [0, 1],   // Move right
          [-1, 0],  // Move up
          [1, 0]    // Move down
        ];
        
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
          
          for (let move of moves) {
            const newY = y + move[0];
            const newX = x + move[1];
            
            if (newX >= 0 && newX < ncols && newY >= 0 && newY < nrows) {
              boardCopy[newY][newX] = !boardCopy[newY][newX];
            }
          }          
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);

      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  useEffect(() => {
    function hasWon() {
      // TODO: check the board in state to determine whether the player has won.
      return board.every(row => row.every(cell => cell === true));
    }

    if(hasWon()){
      setGameOver(true);
      setTimeout(() => {
        alert('You won!');
      }, 0);
    }
  }, [board]);
  
  // TODO

  // make table board

  if(gameOver){
    return (
      <tbody></tbody>
    )
  }
  return (
    <tbody>
      {board.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((col, colIndex) => (
            <Cell 
              key={`${rowIndex}-${colIndex}`} 
              flipCellsAroundMe={() => flipCellsAround(`${rowIndex}-${colIndex}`)} 
              isLit={col} />
          ))}
        </tr>
      ))}
    </tbody>
  ) 
}

export default Board;
