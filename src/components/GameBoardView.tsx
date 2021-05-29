import styled from '@emotion/styled';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { move, MoveDirection, selectGame } from '../redux/reducer';
import {
  HORIZONTAL_CELLS_COUNT,
  VERTICAL_CELLS_COUNT,
  MAX_ITEM_SIZE,
} from '../redux/utils';
import ItemView from './ItemView';

const TOTTER_LINE_HEIGHT = 5;
const TOTTER_BALANCER_HEIGHT = 100;
const BOARD_WIDTH = MAX_ITEM_SIZE * HORIZONTAL_CELLS_COUNT * 2;
const BOARD_HEIGHT = MAX_ITEM_SIZE * VERTICAL_CELLS_COUNT;

const GameBoardDiv = styled.div`
  width: ${BOARD_WIDTH}px;
  height: ${BOARD_HEIGHT}px;
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
  border-left: ${TOTTER_BALANCER_HEIGHT / 3}px solid transparent;
  border-right: ${TOTTER_BALANCER_HEIGHT / 3}px solid transparent;
  border-bottom: ${TOTTER_BALANCER_HEIGHT}px solid gray;
`;

const ItemViewContainerDiv = styled.div`
  width: 50%;
  height: 100%;
  background-color: #4c4b4b0f;
  position: relative;
`;

const GameBoardView = () => {
  const {
    isStarted,
    isFinished,
    shouldProceedNextRound,
    hasReachedGoalLine,
    ongoingItems,
    doneItems,
  } = useAppSelector(selectGame);
  const dispatch = useAppDispatch();
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const fallingItemContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (fieldRef && fieldRef.current) {
      fieldRef.current.focus();
      console.log('focused it');
    }
  }, [ongoingItems]);

  // Invoke movement for certain time interval
  // when items exist and they are yet to react the goal line.
  React.useEffect(() => {
    if (ongoingItems && !hasReachedGoalLine) {
      const timedMovement = setInterval(() => {
        dispatch(move(MoveDirection.bottom));
      }, 1000);
      return () => clearInterval(timedMovement);
    }
  }, [ongoingItems, hasReachedGoalLine]);

  React.useLayoutEffect(() => {
    if (fallingItemContainerRef && fallingItemContainerRef.current) {
      console.log('Width ' + fallingItemContainerRef.current.offsetWidth);
      console.log('Height ' + fallingItemContainerRef.current.offsetHeight);
      console.log('Left ' + fallingItemContainerRef.current.offsetLeft);
    }
  }, []);

  const handleMovement = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        if (!hasReachedGoalLine) {
          return dispatch(move(MoveDirection.bottom));
        }
        break;
      case 'ArrowLeft':
        if (ongoingItems!.human.cellPositionX > 1) {
          return dispatch(move(MoveDirection.left));
        }
        break;
      case 'ArrowRight':
        if (ongoingItems!.human.cellPositionX < HORIZONTAL_CELLS_COUNT) {
          return dispatch(move(MoveDirection.right));
        }
        break;
      default:
        return;
    }
  };

  const handleFocus = () => {
    if (fieldRef && fieldRef.current) {
      fieldRef.current.focus();
    }
  };

  return (
    <GameBoardDiv onClick={handleFocus}>
      <ItemViewContainerDiv ref={fallingItemContainerRef}>
        {ongoingItems?.human && (
          // tabIndex is needed to receive key down events.
          <span onKeyDown={handleMovement} ref={fieldRef} tabIndex={0}>
            <ItemView
              id={ongoingItems.human.id}
              weight={ongoingItems.human.weight}
              scaleSize={ongoingItems.human.scaleSize}
              offsetX={ongoingItems.human.offsetX}
              offsetY={ongoingItems.human.offsetY}
              itemShape={ongoingItems.human.itemShape}
            />
          </span>
        )}
      </ItemViewContainerDiv>
      <ItemViewContainerDiv ref={fallingItemContainerRef}>
        {ongoingItems?.machine && (
          <ItemView
            id={ongoingItems.machine.id}
            weight={ongoingItems.machine.weight}
            scaleSize={ongoingItems.machine.scaleSize}
            offsetX={ongoingItems.machine.offsetX}
            offsetY={ongoingItems.machine.offsetY}
            itemShape={ongoingItems.machine.itemShape}
          />
        )}
      </ItemViewContainerDiv>
      <TotterBaseDiv>
        <TotterLineDiv></TotterLineDiv>
        <TriangleDiv></TriangleDiv>
      </TotterBaseDiv>
    </GameBoardDiv>
  );
};

export default GameBoardView;
