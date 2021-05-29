import styled from '@emotion/styled';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  selectGame,
  startNewGame,
  stopCurrentGame,
  continueCurrentGame,
  humanMove,
  MoveDirection,
} from '../redux/reducer';

const ControllerContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  height: 100px;
  padding-right: 100px;
`;

const ControlButton = styled.button`
  width: 80px;
  padding: 10px 15px;
`;

export const ControllerView = () => {
  const { isStopped } = useAppSelector(selectGame);
  const dispatch = useAppDispatch();
  const invokeNewGame = () => dispatch(startNewGame());
  const handleGameFlow = () => {
    if (!isStopped) {
      dispatch(stopCurrentGame());
    }

    dispatch(continueCurrentGame());
  };

  return (
    <ControllerContainer>
      <ControlButton onClick={invokeNewGame}>New game</ControlButton>
      <ControlButton onClick={handleGameFlow}>
        {isStopped ? 'Continue' : 'Stop'}
      </ControlButton>
      <ControlButton onClick={() => dispatch(humanMove(MoveDirection.right))}>
        Move right
      </ControlButton>
    </ControllerContainer>
  );
};

export default ControllerView;
