import React, { CSSProperties } from 'react'

export class ControlPanel extends React.Component {
  ControlPanelStyle: CSSProperties = {
    width: '40vh',
    height: '4vh',
    border: 'solid',
    borderBottom: 'none',
  }

  render() {
    return <div style={this.ControlPanelStyle} />
  }
}
