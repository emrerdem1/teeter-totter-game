import React from 'react';
import styled from '@emotion/styled';
import StatisticsView from './StatisticsView';
import GameBoardView from './GameBoardView';

const ScreenDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 700px;
  height: 600px;
  justify-content: center;
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
