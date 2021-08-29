import React from 'react'
import { Cell } from './Cell'

type ElementProps = {
  boardPosX: number
  boardPosY: number
  shape: string[][]
}

//All tetramino variants
export const Shapes: string[][][] = [
  [
    ['red', 'red'],
    ['red', 'red'],
  ],

  [
    ['white', 'green'],
    ['green', 'green'],
    ['white', 'green'],
  ],

  [
    ['white', 'blue'],
    ['blue', 'blue'],
    ['blue', 'white'],
  ],

  [
    ['white', 'orange', 'orange'],
    ['orange', 'orange', 'white'],
  ],

  [['yellow', 'yellow', 'yellow', 'yellow']],

  [
    ['pink', 'pink', 'pink'],
    ['white', 'white', 'pink'],
  ],

  [
    ['cyan', 'cyan', 'cyan'],
    ['cyan', 'white', 'white'],
  ],
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
          gridTemplateColumns: `repeat(${
            typeof this.props.shape == 'undefined'
              ? 0
              : this.props.shape[0].length
          },4vh)`,
        }}
        className={'tetramino'}
      >
        {typeof this.props.shape !== 'undefined' &&
          this.props.shape.map((rows, i) =>
            rows.map((col, j) => (
              <Cell
                Color={this.props.shape[i][j]}
                key={`f${i}+${j}`}
                Zindex={this.props.shape[i][j] === 'white' ? 0 : 1}
              />
            ))
          )}
      </div>
    )
  }
}

export class FigureFactory {
  static GetRandomTetramino(): string[][] {
    return Shapes[Math.floor(Math.random() * (Shapes.length + 1))]
  }
}
