import React, { CSSProperties } from 'react'
import { Cell } from './Cell'
import { Tetris } from './Tetris'

type StatePanelProps = {
  linesBurned: number
  score: number
  levelCallback: (stage: number) => void
  nextElem: string[][]
}

type StatePanelState = {
  stage: number
}

export class StatePanel extends React.Component<
  StatePanelProps,
  StatePanelState
> {
  StatePanelStyle: CSSProperties = {
    width: `${Tetris.scalingFactor * 5}vh`,
    height: `${Tetris.scalingFactor * 21 + 0.3}vh`, //20 board + 1 control panel + 3 borders(0.1 each)
    border: 'solid',
    borderLeft: 'none',
    float: 'left',
    position: 'relative',
  }

  constructor(props: StatePanelProps) {
    super(props)
    this.state = { stage: 1 }
  }

  maxLevel = 10

  minLevel = 1

  IncrementLevel = () => {
    let newLevel = this.state.stage
    newLevel++
    if (newLevel > this.maxLevel) {
      newLevel = this.maxLevel
    }
    this.setState({ stage: newLevel })
    this.props.levelCallback(newLevel)
  }

  DecrementLevel = () => {
    let newLevel = this.state.stage
    newLevel--
    if (newLevel < this.minLevel) {
      newLevel = this.minLevel
    }
    this.setState({ stage: newLevel })
    this.props.levelCallback(newLevel)
  }

  GetGridLines = (): number => {
    if (typeof this.props.nextElem == 'undefined') {
      return 0
    } else {
      return this.props.nextElem[0].length
    }
  }

  render() {
    return (
      <div style={this.StatePanelStyle}>
        <div
          id={'nextElement'}
          style={{
            position: 'absolute',
            display: 'grid',
            margin: '0 auto',
            width: '100%',
            gridTemplateColumns: `repeat(${this.GetGridLines()},4vh)`,
          }}
        >
          {typeof this.props.nextElem !== 'undefined' &&
            this.props.nextElem.map((rows, i) =>
              rows.map((col, j) => (
                <Cell
                  Color={this.props.nextElem[i][j]}
                  key={`n${i}+${j}`}
                  Zindex={1}
                />
              ))
            )}
        </div>
        <div id={'stage elements'} style={{ position: 'relative' }}>
          <h2
            style={{
              position: 'absolute',
              top: '24vh',
              textAlign: 'center',
              width: '100%',
            }}
          >
            Level
          </h2>
          <div
            id={'stage selector'}
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              width: '100%',
              position: 'absolute',
              alignItems: 'baseline',
              top: '30vh',
            }}
          >
            <button
              style={{ width: '5vh', height: '5vh' }}
              onClick={this.DecrementLevel}
            >
              -
            </button>
            <input
              value={this.state.stage}
              style={{ width: '8vh', height: '5vh', textAlign: 'center' }}
              disabled={true}
            ></input>
            <button
              style={{ width: '5vh', height: '5vh' }}
              onClick={this.IncrementLevel}
            >
              +
            </button>
          </div>
        </div>
        <div
          id={'score elements'}
          style={{
            display: 'flex',
            width: '100%',
            position: 'absolute',
            alignItems: 'baseline',
            top: '50vh',
          }}
        >
          <h2 style={{ width: '50%', textAlign: 'center' }}>Score:</h2>
          <input
            disabled={true}
            style={{ width: '50%', height: '100%', textAlign: 'right' }}
            value={this.props.score}
          ></input>
        </div>
        <div
          id={'lines elements'}
          style={{
            display: 'flex',
            width: '100%',
            position: 'absolute',
            alignItems: 'baseline',
            top: '55vh',
          }}
        >
          <h2 style={{ width: '50%', textAlign: 'center' }}>Lines:</h2>
          <input
            disabled={true}
            style={{ width: '50%', height: '100%', textAlign: 'right' }}
            value={this.props.linesBurned}
          ></input>
        </div>
      </div>
    )
  }
}
