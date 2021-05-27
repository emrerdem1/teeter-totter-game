import React from 'react';
import styled from '@emotion/styled';
import StatisticsView from './StatisticsView';
import ItemView from './ItemView';

const TOTTER_LINE_HEIGHT = 5;
const TOTTER_BALANCER_HEIGHT = 100;

const ScreenDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 700px;
  height: 600px;
`;

const GameBoardDiv = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  position: relative;
  flex-wrap: wrap;
`;

const TotterBaseDiv = styled.div`
  width: 100%;
  height: ${TOTTER_BALANCER_HEIGHT + TOTTER_LINE_HEIGHT}px;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-end;
  justify-content: center;
`;

const TotterLineDiv = styled.div`
  width: 100%;
  height: ${TOTTER_LINE_HEIGHT}px;
  background: red;
`;

const TriangleDiv = styled.div`
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid gray;
`;

const ItemViewContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #4c4b4b0f;
`;

export const PlaygroundView: React.FC = () => {
  const fieldRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    console.log(fieldRef);
    if (fieldRef && fieldRef.current) {
      console.log('Width ' + fieldRef.current.offsetWidth);
      console.log('Height ' + fieldRef.current.offsetHeight);
    }
  }, []);

  return (
    <ScreenDiv>
      <StatisticsView />
      <GameBoardDiv ref={fieldRef}>
        <ItemViewContainerDiv>
          <ItemView />
        </ItemViewContainerDiv>
        <TotterBaseDiv>
          <TotterLineDiv></TotterLineDiv>
          <TriangleDiv></TriangleDiv>
        </TotterBaseDiv>
      </GameBoardDiv>
    </ScreenDiv>
  );
};

export default PlaygroundView;
