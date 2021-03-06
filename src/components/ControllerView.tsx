import styled from '@emotion/styled';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectGame, startNewGame, startNewRound, toggleCurrentGameFlow } from '../redux/reducer';

const ControllerContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  height: 100px;
`;

const ControlButton = styled.button`
  padding: 12px 16px;
`;

export const ControllerView: React.FC = () => {
  const { isStopped, isStarted, isFinished } = useAppSelector(selectGame);
  const dispatch = useAppDispatch();

  const invokeNewGame = () => {
    dispatch(startNewGame());
    dispatch(startNewRound());
  };

  const handleGameFlow = () => {
    dispatch(toggleCurrentGameFlow());
  };

  return (
    <ControllerContainer>
      <ControlButton onClick={invokeNewGame}>New game</ControlButton>
      <ControlButton onClick={handleGameFlow} disabled={!isStarted || isFinished}>
        {isStopped ? 'Continue' : 'Stop'}
      </ControlButton>
    </ControllerContainer>
  );
};

export default ControllerView;
