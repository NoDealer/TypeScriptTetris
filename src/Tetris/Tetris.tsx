import React from 'react'
import { Board } from './Board'
import { ControlPanel } from './ControlPanel'
import { StatePanel } from './StatePanel'
import { FigureFactory } from './Element'

type TetrisProp = {
  cols: number
  rows: number
}

type TetrisState = {
  board: string[][]
  currentElement: string[][]
  nextElement: string[][]
  elementPosX: number
  elementPosY: number
  firstMoveSpawn: boolean
  gamePaused: boolean
  gameOver: boolean
  newTetramino: boolean
  linesBurned: number
  score: number
  level: number
  prevousLevelUp: number
}

export class Tetris extends React.Component<TetrisProp, TetrisState> {
  startingX = 4
  startingY = 0

  CreateDefaultBoard(): string[][] {
    const rows: string[][] = []
    for (let i = 0; i < this.props.rows; i++) {
      rows.push(Array.from(Array(this.props.cols), () => 'white'))
    }
    return rows
  }

  constructor(props: TetrisProp) {
    super(props)
    this.state = {
      currentElement: [[]],
      nextElement: [[]],
      elementPosX: 4,
      elementPosY: 0,
      board: this.CreateDefaultBoard(),
      firstMoveSpawn: true,
      gameOver: false,
      gamePaused: false,
      newTetramino: true,
      score: 0,
      linesBurned: 0,
      level: 1,
      prevousLevelUp: 0,
    }
  }

  GameLoop = (): void => {
    const nextExecTime = this.GetTimeStep()
    const fallX = 0
    const fallY = 1
    if (!this.state.gamePaused) {
      if (this.state.firstMoveSpawn) {
        this.setState({
          currentElement: FigureFactory.GetRandomTetramino(),
          nextElement: FigureFactory.GetRandomTetramino(),
          newTetramino: false,
          firstMoveSpawn: false,
        })
      } else if (this.state.newTetramino) {
        this.setState({
          currentElement: this.state.nextElement,
          nextElement: FigureFactory.GetRandomTetramino(),
          newTetramino: false,
        })
      }
      if (this.IsLocationPossible(this.state.currentElement, fallX, fallY)) {
        this.MoveInDirection(fallX, fallY)
      } else {
        this.FixTetramino()
        this.ClearFullRows()
        if (
          this.state.linesBurned - this.state.prevousLevelUp > 10 &&
          this.state.level != 10
        ) {
          const newLevel = this.state.level + 1
          this.setState({
            prevousLevelUp: this.state.linesBurned,
            level: newLevel,
          })
        }
        this.setState({
          newTetramino: true,
          elementPosX: this.startingX,
          elementPosY: this.startingY,
        })
        this.CheckIfGameIsOver()
      }
      if (this.state.gameOver) {
        this.setState({
          newTetramino: true,
          elementPosX: this.startingX,
          elementPosY: this.startingY,
          board: this.CreateDefaultBoard(),
          firstMoveSpawn: false,
          currentElement: [[]],
        })
        return
      }
    }
    setTimeout(this.GameLoop, nextExecTime)
  }

  IsLocationPossible(element: string[][], x: number, y: number): boolean {
    if (typeof element == 'undefined' || element.length == 0) return false
    for (let i = 0; i < element.length; i++)
      for (let j = 0; j < element[i].length; j++) {
        //detect border collision
        if (
          i + y + this.state.elementPosY < 0 ||
          i + y + this.state.elementPosY >= this.props.rows ||
          j + x + this.state.elementPosX < 0 ||
          j + x + this.state.elementPosX >= this.props.cols
        ) {
          return false
        }
        //detect field collision
        if (
          element[i][j] != 'white' &&
          this.state.board[i + y + this.state.elementPosY][
            j + x + this.state.elementPosX
          ] != 'white'
        ) {
          return false
        }
      }
    return true
  }

  GetTimeStep = (): number => {
    return 600 - 40 * this.state.level
  }

  MoveInDirection(x: number, y: number): void {
    if (this.state.currentElement.length == 0) return
    const newX = this.state.elementPosX + x
    const newY = this.state.elementPosY + y
    this.setState({ elementPosX: newX })
    this.setState({ elementPosY: newY })
  }

  Rotate() {
    const shape = this.RotateClockwise(this.state.currentElement)
    //Clear previous element
    this.setState({ currentElement: [[]] })
    //Draw it again
    this.setState({ currentElement: shape })
  }

  RotateClockwise(array: string[][]): string[][] {
    const result: string[][] = []
    array.forEach(function (a, i, aa) {
      a.forEach(function (b, j) {
        result[j] = result[j] || []
        result[j][aa.length - i - 1] = b
      })
    })
    return result
  }

  FixTetramino = () => {
    if (typeof this.state.currentElement == 'undefined') return
    const newBoard = this.state.board.map(function (arr) {
      return arr.slice()
    })
    for (let i = 0; i < this.state.currentElement.length; i++)
      for (let j = 0; j < this.state.currentElement[i].length; j++) {
        if (this.state.currentElement[i][j] != 'white') {
          newBoard[i + this.state.elementPosY][
            j + this.state.elementPosX
          ] = this.state.currentElement[i][j]
        }
      }
    this.setState({ board: newBoard, currentElement: [[]] })
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
        if (this.IsLocationPossible(this.state.currentElement, -step, 0)) {
          this.MoveInDirection(-step, 0)
        }
        break
      case arrowRight:
        if (this.IsLocationPossible(this.state.currentElement, step, 0)) {
          this.MoveInDirection(step, 0)
        }
        break
      case arrowUp:
        if (
          this.IsLocationPossible(
            this.RotateClockwise(this.state.currentElement),
            0,
            0
          )
        ) {
          this.Rotate()
        }
        break
      case arrowDown:
        if (this.IsLocationPossible(this.state.currentElement, 0, step)) {
          this.MoveInDirection(0, step)
        }
        break
      default:
        console.log('non effect buttonPressed')
        break
    }
  }

  Pause = () => {
    this.setState({ gamePaused: !this.state.gamePaused })
  }

  ResetGame = () => {
    this.setState({
      board: this.CreateDefaultBoard(),
      firstMoveSpawn: false,
      currentElement: [[]],
    })
  }

  ClearFullRows = () => {
    const newBoard = this.state.board
    const indexes: number[] = []
    let newLinesCount = this.state.linesBurned
    let newScore = this.state.score

    newBoard.map((rows, i) => {
      if (rows.every((elem) => elem !== 'white')) {
        indexes.push(i)
      }
    })

    for (let i = indexes.length - 1; i >= 0; i--) {
      newBoard.splice(indexes[i], 1)
    }

    indexes.forEach(() => {
      newBoard.unshift(new Array(10).fill('white'))
    })
    newLinesCount += indexes.length
    newScore += indexes.length * indexes.length * 10
    this.setState({
      board: newBoard,
      linesBurned: newLinesCount,
      score: newScore,
    })
  }

  CheckIfGameIsOver = () => {
    if (this.state.board[0].some((cell) => cell !== 'white')) {
      this.setState({ gameOver: true })
    }
  }

  GetLevelFromStatePanel = (stage: number): void => {
    this.setState({ level: stage })
  }

  render() {
    return (
      <div>
        <div id={'contolSide'} style={{ float: 'left' }}>
          <ControlPanel
            StartGameFunc={this.GameLoop}
            PauseGameFunc={this.Pause}
            ResetGameFunc={this.ResetGame}
          />
          <Board
            currentBoard={this.state.board}
            figurePosX={this.state.elementPosX}
            figurePosY={this.state.elementPosY}
            shape={this.state.currentElement}
            rowNum={this.props.rows}
            colNum={this.props.cols}
          />
        </div>
        <StatePanel
          nextElem={this.state.nextElement}
          score={this.state.score}
          linesBurned={this.state.linesBurned}
          levelCallback={this.GetLevelFromStatePanel}
        />
      </div>
    )
  }
}
