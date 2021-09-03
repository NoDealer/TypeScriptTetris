import React from 'react';

export type CellProps = {
  Color: string;
  Zindex: number;
};

export class Cell extends React.Component<CellProps> {
  render() {
    return (
      <div
        style={{
          width: '4vh',
          height: '4vh',
          backgroundColor: this.props.Color,
          position: 'static',
          zIndex: this.props.Zindex,
        }}
      ></div>
    );
  }
}
