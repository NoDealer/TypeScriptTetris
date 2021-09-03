import React, { CSSProperties } from 'react'
import { Cell } from './Cell'
import { Tetramino } from './Element'

type StatePanelProps = {
  linesBurned: number
  score: number
  levelCallback: (stage: number) => void
  nextElem: Tetramino
  scaleFactor: number
  rows: number
}

type StatePanelState = {
  stage: number
}

export class StatePanel extends React.Component<
  StatePanelProps,
  StatePanelState
> {
  StatePanelStyle: CSSProperties = {
    width: `${this.props.scaleFactor * 5}vh`,
    height: `${this.props.scaleFactor * 21 + 0.3}vh`, //20 board + 1 control panel + 3 borders(0.1 each)
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
      return this.props.nextElem.Shape[0].length
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
            gridTemplateColumns: `repeat(${this.GetGridLines()},${
              this.props.scaleFactor
            }vh)`,
          }}
        >
          {typeof this.props.nextElem !== 'undefined' &&
            this.props.nextElem.Shape.map((rows, i) =>
              rows.map((col, j) => (
                <Cell
                  Color={this.props.nextElem.Shape[i][j]}
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
              top: `${3 * this.props.scaleFactor}vh`,
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
              top: `${4.5 * this.props.scaleFactor}vh`,
            }}
          >
            <button
              style={{
                width: `${this.props.scaleFactor}vh`,
                height: `${this.props.scaleFactor}vh`,
              }}
              onClick={this.DecrementLevel}
            >
              -
            </button>
            <input
              value={this.state.stage}
              style={{
                width: `${this.props.scaleFactor * 2}vh`,
                height: `${this.props.scaleFactor}vh`,
                textAlign: 'center',
              }}
              disabled={true}
            ></input>
            <button
              style={{
                width: `${this.props.scaleFactor}vh`,
                height: `${this.props.scaleFactor}vh`,
              }}
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
            top: `${this.props.scaleFactor * 7}vh`,
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
            top: `${this.props.scaleFactor * 8}vh`,
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
