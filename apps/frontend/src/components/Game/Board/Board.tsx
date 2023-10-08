interface IBoard {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
}

import { Square } from '../Square/Square';
import React from 'react';

export const Board = ({ xIsNext, squares, onPlay }: IBoard) => {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner is ' + winner;
  } else {
    status = 'Next player is ' + (xIsNext ? 'X' : 'O');
  }

  const handleClick = (i: number) => () => {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();

    xIsNext ? (nextSquares[i] = 'X') : (nextSquares[i] = 'O');

    onPlay(nextSquares);
  };

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={handleClick(0)} />
        <Square value={squares[1]} onSquareClick={handleClick(1)} />
        <Square value={squares[2]} onSquareClick={handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={handleClick(3)} />
        <Square value={squares[4]} onSquareClick={handleClick(4)} />
        <Square value={squares[5]} onSquareClick={handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={handleClick(6)} />
        <Square value={squares[7]} onSquareClick={handleClick(7)} />
        <Square value={squares[8]} onSquareClick={handleClick(8)} />
      </div>
    </>
  );
};

const calculateWinner = (squares: string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};