import React from 'react'
import { Board } from './Board'
import { FigureFactory, Tetramino } from './Element'

type TetrisProp = {}

type TetrisState = {
  shape: Tetramino
  posX: number
  posY: number
}

export class Tetris extends React.Component<TetrisProp, TetrisState> {
  colNum = 10
  rowNum = 20

  startingX = 4
  startingY = 0

  CreateDefaultBoard(): string[][] {
    const rows: string[][] = []
    for (let i = 0; i < this.rowNum; i++) {
      rows.push(Array.from(Array(this.colNum), () => 'white'))
    }
    return rows
  }

  constructor(props: TetrisProp) {
    super(props)
    this.state = {
      shape: FigureFactory.GetRandomTetramino(),
      posX: 4,
      posY: 0,
    }
  }

  board: string[][] = this.CreateDefaultBoard()

  GameLoop(): void {}

  CanMoveInDirection(x: number, y: number): boolean {
    let movePossible = true
    this.state.shape.Shape.map((row, i) => {
      row.map((col, j) => {
        //Detect border collision
        if (
          y + i + this.state.posY < 0 ||
          y + i + this.state.posY >= this.rowNum ||
          x + j + this.state.posX < 0 ||
          x + j + this.state.posX >= this.colNum
        ) {
          movePossible = false
        }
        //Detect block collision
        if (
          this.state.shape.Shape[i][j] != 'white' &&
          this.board[i + y + this.state.posY][j + x + this.state.posX] !=
            'white'
        ) {
          movePossible = false
        }
      })
    })
    return movePossible
  }

  MoveInDirection(x: number, y: number): void {
    const newX = this.state.posX + x
    const newY = this.state.posY + y
    this.setState({ posX: newX })
    this.setState({ posY: newY })
  }

  Rotate() {
    const shape = this.rotateLeft(this.state.shape.Shape)
    this.setState({ shape: { Shape: [[]] } })
    this.setState({ shape: { Shape: shape } })
  }

  rotateLeft(array: string[][]): string[][] {
    const result: string[][] = []
    array.forEach(function (a, i, aa) {
      a.forEach(function (b, j, bb) {
        result[j] = result[j] || []
        result[j][aa.length - i - 1] = b
      })
    })
    return result
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyPressHandle)
  }

  keyPressHandle = (event: KeyboardEvent) => {
    if (this.state == null) {
      return
    }
    const arrowLeft = 37
    const arrowUp = 38
    const arrowRight = 39
    const arrowDown = 40

    const step = 1

    switch (event.keyCode) {
      case arrowLeft:
        if (this.CanMoveInDirection(-step, 0)) {
          this.MoveInDirection(-step, 0)
        }
        break
      case arrowRight:
        if (this.CanMoveInDirection(step, 0)) {
          this.MoveInDirection(step, 0)
        }
        break
      case arrowUp:
        this.Rotate()
        break
      case arrowDown:
        if (this.CanMoveInDirection(0, step)) {
          this.MoveInDirection(0, step)
        }
        break
      default:
        console.log('buttonPressed')
        break
    }
  }

  render() {
    return (
      <Board
        figurePosX={this.state.posX}
        figurePosY={this.state.posY}
        shape={this.state.shape}
        rowNum={this.rowNum}
        colNum={this.colNum}
        currentBoard={this.board}
      />
    )
  }
}
