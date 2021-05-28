import styled from '@emotion/styled';
import React from 'react';
import { useAppDispatch } from '../redux/hooks';
import { startNewGame, stopCurrentGame } from '../redux/reducer';

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
  const dispatch = useAppDispatch();
  const invokeNewGame = () => dispatch(startNewGame());
  const stopGame = () => dispatch(stopCurrentGame());

  return (
    <ControllerContainer>
      <ControlButton onClick={invokeNewGame}>New game</ControlButton>
      <ControlButton onClick={stopGame}>Stop</ControlButton>
    </ControllerContainer>
  );
};

export default ControllerView;
