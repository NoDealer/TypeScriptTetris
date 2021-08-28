import React, { CSSProperties } from 'react'
import { Cell } from './Cell'
import { Figure, Tetramino } from './Element'

type BoardProps = {
  rowNum: number
  colNum: number
  currentBoard: string[][]
  shape: Tetramino
  figurePosX: number
  figurePosY: number
}

export class Board extends React.Component<BoardProps> {
  BoardStyle: CSSProperties = {
    border: 'solid',
    width: '40vh',
    height: '80vh',
    display: 'grid',
    position: 'relative',
    gridTemplateColumns: `repeat(${this.props.colNum},4vh)`,
  }

  render() {
    return (
      <div id="board" style={this.BoardStyle}>
        <Figure
          boardPosX={this.props.figurePosX}
          boardPosY={this.props.figurePosY}
          shape={this.props.shape}
        />
        {this.props.currentBoard.map((rows, i) =>
          rows.map((col, j) => (
            <Cell Color={this.props.currentBoard[i][j]} key={`${i}+${j}`} />
          ))
        )}
      </div>
    )
  }
}
