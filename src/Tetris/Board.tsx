import React, { CSSProperties } from 'react'
import { Cell } from './Cell'
import { Figure } from './Element'

type BoardProps = {
  rowNum: number
  colNum: number
  currentBoard: string[][]
  shape: string[][]
  figurePosX: number
  figurePosY: number
}

export class Board extends React.Component<BoardProps> {
  BoardStyle: CSSProperties = {
    border: 'solid',
    width: '40vh',
    height: '80vh',
    display: 'grid',
    gridTemplateColumns: `repeat(${this.props.colNum},4vh)`,
  }

  render() {
    return (
      <div
        id="board"
        style={{
          border: 'solid',
          width: '40vh',
          height: '80vh',
          display: 'grid',
          position: 'relative',
          gridTemplateColumns: `repeat(${this.props.colNum},4vh)`,
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
          shape={this.props.shape}
        />
      </div>
    )
  }
}
