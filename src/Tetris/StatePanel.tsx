import React, { CSSProperties } from 'react'
import { Figure } from './Element'

// eslint-disable-next-line @typescript-eslint/ban-types
type StatePanelProps = {
  linesBurned: number
  score: number
}

type StatePanelState = {
  stage: number
}

export class StatePanel extends React.Component<
  StatePanelProps,
  StatePanelState
> {
  StatePanelStyle: CSSProperties = {
    width: '20vh',
    height: '84.3vh', //80vh board + 4vh control panel + 3 borders(0.1)
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
      this.setState({ stage: this.maxLevel })
    } else {
      this.setState({ stage: newLevel })
    }
  }

  DecrementLevel = () => {
    let newLevel = this.state.stage
    newLevel--
    if (newLevel < this.minLevel) {
      this.setState({ stage: this.minLevel })
    } else {
      this.setState({ stage: newLevel })
    }
  }

  render() {
    return (
      <div style={this.StatePanelStyle}>
        <div id={'nextElement'}>
          <Figure />
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
