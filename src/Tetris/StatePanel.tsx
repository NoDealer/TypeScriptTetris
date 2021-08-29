import React, { CSSProperties } from 'react'

export class StatePanel extends React.Component {
  StatePanelStyle: CSSProperties = {
    width: '20vh',
    height: '84.3vh', //80vh board + 4vh control panel + 3 borders(0.1)
    border: 'solid',
    borderLeft: 'none',
    float: 'left',
    position: 'relative',
  }

  render() {
    return <div style={this.StatePanelStyle} />
  }
}
