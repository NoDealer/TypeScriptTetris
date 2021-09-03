import React from 'react';
import { Cell } from './Cell';

type ElementProps = {
  boardPosX: number;
  boardPosY: number;
  figure: Tetramino;
  scaleFactor: number;
};

export class Tetramino {
  public Shape: string[][] = [];

  static ElementNotExist(element: Tetramino): boolean {
    return typeof element === 'undefined' || element.Shape.length === 0;
  }
}

//All tetramino variants
export const Shapes: Tetramino[] = [
  {
    Shape: [
      ['red', 'red'],
      ['red', 'red'],
    ],
  },

  {
    Shape: [
      ['white', 'green'],
      ['green', 'green'],
      ['white', 'green'],
    ],
  },

  {
    Shape: [
      ['white', 'blue'],
      ['blue', 'blue'],
      ['blue', 'white'],
    ],
  },

  {
    Shape: [
      ['white', 'orange', 'orange'],
      ['orange', 'orange', 'white'],
    ],
  },

  {
    Shape: [['yellow', 'yellow', 'yellow', 'yellow']],
  },

  {
    Shape: [
      ['pink', 'pink', 'pink'],
      ['white', 'white', 'pink'],
    ],
  },

  {
    Shape: [
      ['cyan', 'cyan', 'cyan'],
      ['cyan', 'white', 'white'],
    ],
  },
];

export class Figure extends React.Component<ElementProps> {
  constructor(props: ElementProps) {
    super(props);
  }

  public render() {
    return (
      <div
        style={{
          position: 'absolute',
          left: `${this.props.scaleFactor * this.props.boardPosX}vh`,
          top: `${this.props.scaleFactor * this.props.boardPosY}vh`,
          display: 'grid',
          gridTemplateColumns: `repeat(${
            typeof this.props.figure.Shape === 'undefined'
              ? 0
              : this.props.figure.Shape[0].length
          },4vh)`,
        }}
        className={'tetramino'}
      >
        {typeof this.props.figure !== 'undefined' &&
          this.props.figure.Shape.map((rows, i) =>
            rows.map((col, j) => (
              <Cell
                Color={this.props.figure.Shape[i][j]}
                key={`f${i}+${j}`}
                Zindex={this.props.figure.Shape[i][j] === 'white' ? 0 : 1}
              />
            ))
          )}
      </div>
    );
  }
}

export class FigureFactory {
  static GetRandomTetramino(): Tetramino {
    return Shapes[Math.floor(Math.random() * Shapes.length)];
  }
}
