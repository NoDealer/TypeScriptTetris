import React from 'react'
import { Cell } from './Cell'
import { Figure, Tetramino } from './Element'
import { Tetris } from './Tetris'

type BoardProps = {
  rowNum: number
  colNum: number
  currentBoard: string[][]
  shape: Tetramino
  figurePosX: number
  figurePosY: number
}

export class Board extends React.Component<BoardProps> {
  render() {
    return (
      <div
        id="board"
        style={{
          border: 'solid',
          width: `${Tetris.scalingFactor * this.props.colNum}vh`,
          height: `${Tetris.scalingFactor * this.props.rowNum}vh`,
          display: 'grid',
          position: 'relative',
          gridTemplateColumns: `repeat(${this.props.colNum},${Tetris.scalingFactor}vh)`,
        }}
      >
        {this.props.currentBoard.map((rows, i) =>
          rows.map((col, j) => (
            <Cell
              Color={this.props.currentBoard[i][j]}
              key={`b${i}+${j}`}
              Zindex={this.props.currentBoard[i][j] === 'white' ? 0 : 2}
            />
          ))
        )}
        <Figure
          boardPosX={this.props.figurePosX}
          boardPosY={this.props.figurePosY}
          figure={this.props.shape}
        />
      </div>
    )
  }
}
