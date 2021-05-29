import styled from '@emotion/styled';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  selectGame,
  startNewGame,
  startNewRound,
  toggleCurrentGameFlow,
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

export const ControllerView: React.FC = () => {
  const { isStopped, isStarted } = useAppSelector(selectGame);
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
      <ControlButton onClick={handleGameFlow} disabled={!isStarted}>
        {isStopped ? 'Continue' : 'Stop'}
      </ControlButton>
    </ControllerContainer>
  );
};

export default ControllerView;
