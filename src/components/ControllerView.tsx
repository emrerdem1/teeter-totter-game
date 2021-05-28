import styled from '@emotion/styled';
import React from 'react';
import { useAppDispatch } from '../redux/hooks';
import { startNewGame } from '../redux/reducer';

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
  const invokeNewGame = () => {
    console.log('im called');
    return dispatch(startNewGame());
  };
  return (
    <ControllerContainer>
      <ControlButton onClick={invokeNewGame}>New game</ControlButton>
      <ControlButton>Stop</ControlButton>
    </ControllerContainer>
  );
};

export default ControllerView;
