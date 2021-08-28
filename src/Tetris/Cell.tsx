import React, { CSSProperties } from 'react'

export type CellProps = {
  Color: string
}

export class Cell extends React.Component<CellProps> {
  CellStyle: CSSProperties = {
    //border: 'solid',
    //borderWidth: '0.1vh',
    width: '4vh',
    height: '4vh',
    //borderColor: 'black',
    backgroundColor: this.props.Color,
  }

  render() {
    return <div style={this.CellStyle}></div>
  }
}
