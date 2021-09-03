import { Tetris } from './Tetris/Tetris';

export const App = () => {
  return (
    <>
      <Tetris cols={10} rows={20} scalingFactor={4} />
    </>
  );
};
