import React, { CSSProperties } from 'react';

type ControlPanelProps = {
  StartGameFunc: () => void;
  PauseGameFunc: () => void;
  ResetGameFunc: () => void;
  scaleFactor: number;
};

export class ControlPanel extends React.Component<ControlPanelProps> {
  ControlPanelStyle: CSSProperties = {
    width: `${this.props.scaleFactor * 10}vh`,
    height: `${this.props.scaleFactor}vh`,
    border: 'solid',
    borderBottom: 'none',
    display: 'flex',
  };

  public render() {
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
    );
  }
}
