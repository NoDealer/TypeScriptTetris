import React, { CSSProperties } from 'react'

export class StatePanel extends React.Component {
  StatePanelStyle: CSSProperties = {
    width: '20vh',
    height: '84.3vh',
    border: 'solid',
    borderLeft: 'none',
    float: 'left',
  }

  render() {
    return <div style={this.StatePanelStyle} />
  }
}
