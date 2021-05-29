import styled from '@emotion/styled';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  move,
  autoMove,
  selectGame,
  startNewRound,
  saveCurrentRound,
} from '../redux/reducer';
import { MoveDirection } from '../redux/types';
import {
  HORIZONTAL_CELLS_COUNT,
  VERTICAL_CELLS_COUNT,
  MAX_ITEM_SIZE,
} from '../redux/constants';
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

const TotterLineDiv = styled.div<{ torque: number }>`
  width: 100%;
  height: ${TOTTER_LINE_HEIGHT}px;
  background: red;
  transform: rotate(${(props) => props.torque ?? '0'}deg);
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

// TODO(emrerdem1): Prepare a decent overlay screen.
const GameOverDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #0000003d;
  z-index: 100;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GamePausedDiv = styled(GameOverDiv)``;

const GameBoardView = () => {
  const {
    isStarted,
    isStopped,
    isFinished,
    hasReachedGoalLine,
    speedLevel,
    ongoingItems,
    doneItems,
    torque,
  } = useAppSelector(selectGame);
  const dispatch = useAppDispatch();
  const fallingItemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (fallingItemRef && fallingItemRef.current) {
      fallingItemRef.current.focus();
    }
  }, [ongoingItems]);

  React.useEffect(() => {
    if (hasReachedGoalLine) {
      dispatch(saveCurrentRound());
      dispatch(startNewRound());
    }
  }, [hasReachedGoalLine, dispatch]);

  // Invoke movement for certain time interval
  // when items exist and they are yet to react the goal line.
  React.useEffect(() => {
    if (isStarted && !isStopped && !hasReachedGoalLine) {
      const timedMovement = setInterval(() => {
        dispatch(autoMove(MoveDirection.bottom));
      }, 1000 / speedLevel);
      return () => clearInterval(timedMovement);
    }
  }, [isStarted, isStopped, hasReachedGoalLine, dispatch, speedLevel]);

  const handleMovement = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (!ongoingItems || isStopped || isFinished) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        if (!hasReachedGoalLine) {
          return dispatch(move(MoveDirection.bottom));
        }
        break;
      case 'ArrowLeft':
        if (ongoingItems.human.cellPositionX > 1) {
          return dispatch(move(MoveDirection.left));
        }
        break;
      case 'ArrowRight':
        if (ongoingItems.human.cellPositionX < HORIZONTAL_CELLS_COUNT) {
          return dispatch(move(MoveDirection.right));
        }
        break;
      default:
        return;
    }
  };

  // User should be able to have control when the board is clicked.
  const handleFocus = () => {
    if (fallingItemRef && fallingItemRef.current) {
      fallingItemRef.current.focus();
    }
  };

  return (
    <GameBoardDiv onClick={handleFocus}>
      {isFinished && <GameOverDiv>Game over.</GameOverDiv>}
      {isStopped && <GamePausedDiv>Paused.</GamePausedDiv>}
      <ItemViewContainerDiv>
        {ongoingItems?.human && (
          // tabIndex is needed to receive key down events.
          <span onKeyDown={handleMovement} ref={fallingItemRef} tabIndex={0}>
            <ItemView
              weight={ongoingItems.human.weight}
              scaleSize={ongoingItems.human.scaleSize}
              offsetX={ongoingItems.human.offsetX}
              offsetY={ongoingItems.human.offsetY}
              itemShape={ongoingItems.human.itemShape}
            />
          </span>
        )}
      </ItemViewContainerDiv>
      <ItemViewContainerDiv>
        {ongoingItems?.machine && (
          <ItemView
            weight={ongoingItems.machine.weight}
            scaleSize={ongoingItems.machine.scaleSize}
            offsetX={ongoingItems.machine.offsetX}
            offsetY={ongoingItems.machine.offsetY}
            itemShape={ongoingItems.machine.itemShape}
          />
        )}
      </ItemViewContainerDiv>
      <TotterBaseDiv>
        <TotterLineDiv torque={torque}>
          {doneItems?.human.map((d, idx) => (
            <ItemView
              // TODO(emrerdem1): You should consider having ID
              //or something equivalent for sorting etc.
              key={idx + d.offsetX + d.offsetY}
              weight={d.weight}
              scaleSize={d.scaleSize}
              offsetX={d.offsetX}
              offsetY={d.offsetY}
              itemShape={d.itemShape}
              isInGoalLine={true}
            />
          ))}
        </TotterLineDiv>
        <TriangleDiv></TriangleDiv>
      </TotterBaseDiv>
    </GameBoardDiv>
  );
};

export default GameBoardView;
