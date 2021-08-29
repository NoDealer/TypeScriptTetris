import React, { CSSProperties } from 'react'

type ControlPanelProps = {
  StartGameFunc: () => void
  PauseGameFunc: () => void
  ResetGameFunc: () => void
}

export class ControlPanel extends React.Component<ControlPanelProps> {
  ControlPanelStyle: CSSProperties = {
    width: '40vh',
    height: '4vh',
    border: 'solid',
    borderBottom: 'none',
    display: 'flex',
  }

  render() {
    return (
      <div style={this.ControlPanelStyle}>
        <button style={{ flexGrow: 1 }} onClick={this.props.StartGameFunc}>
          Start game
        </button>
        <button style={{ flexGrow: 1 }} onClick={this.props.PauseGameFunc}>
          Pause game
        </button>
        <button style={{ flexGrow: 1 }} onClick={this.props.ResetGameFunc}>
          Reset game
        </button>
      </div>
    )
  }
}
