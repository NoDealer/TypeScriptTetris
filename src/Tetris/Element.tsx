import React from 'react'
import { Cell } from './Cell'

type ElementProps = {
  boardPosX: number
  boardPosY: number
  shape: Tetramino
}

export type Tetramino = {
  Shape: string[][]
}

export type Element = {
  posX: number
  posY: number
  shape: Tetramino
}

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
]

export class Figure extends React.Component<ElementProps> {
  constructor(props: ElementProps) {
    super(props)
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          left: `${4 * this.props.boardPosX}vh`,
          top: `${4 * this.props.boardPosY}vh`,
          display: 'grid',
          gridTemplateColumns: `repeat(${this.props.shape.Shape[0].length},4vh)`,
        }}
        className={'tetramino'}
      >
        {this.props.shape.Shape.map((rows, i) =>
          rows.map((col, j) => (
            <Cell Color={this.props.shape.Shape[i][j]} key={`f${i}+${j}`} />
          ))
        )}
      </div>
    )
  }
}

export class FigureFactory {
  static GetRandomTetramino(): Tetramino {
    return Shapes[Math.floor(Math.random() * (Shapes.length + 1))]
  }
}
