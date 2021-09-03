import React from 'react'
import { Cell } from './Cell'
import { Figure, Tetramino } from './Element'

type BoardProps = {
  rowNum: number
  colNum: number
  currentBoard: string[][]
  shape: Tetramino
  figurePosX: number
  figurePosY: number
  scaleFactor: number
}

export class Board extends React.Component<BoardProps> {
  render() {
    return (
      <div
        id="board"
        style={{
          border: 'solid',
          width: `${this.props.scaleFactor * this.props.colNum}vh`,
          height: `${this.props.scaleFactor * this.props.rowNum}vh`,
          display: 'grid',
          position: 'relative',
          gridTemplateColumns: `repeat(${this.props.colNum},${this.props.scaleFactor}vh)`,
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
          scaleFactor={this.props.scaleFactor}
        />
      </div>
    )
  }
}
