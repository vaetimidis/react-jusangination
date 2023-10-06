import type { MouseEventHandler } from 'react';
import React from 'react';

interface ISquare {
  value: string | string[];
  onSquareClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Square = ({ value, onSquareClick }: ISquare) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};
