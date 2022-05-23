import React from 'react';
import styled from '@emotion/styled';
import StatisticsView from './StatisticsView';
import GameBoardView from './GameBoardView';

const ScreenDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
`;

export const PlaygroundView: React.FC = () => {
  return (
    <ScreenDiv>
      <StatisticsView />
      <GameBoardView />
    </ScreenDiv>
  );
};

export default PlaygroundView;
