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
  CELL_UNIT_SIZE,
} from '../redux/constants';
import ItemView from './ItemView';
import BalancerView from './BalancerView';

const BOARD_WIDTH = CELL_UNIT_SIZE * HORIZONTAL_CELLS_COUNT * 2;
const BOARD_HEIGHT = CELL_UNIT_SIZE * VERTICAL_CELLS_COUNT;

const GameBoardDiv = styled.div`
  width: ${BOARD_WIDTH}px;
  height: ${BOARD_HEIGHT}px;
  display: flex;
  position: relative;
  flex-wrap: wrap;
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
              itemColor={ongoingItems.human.itemColor}
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
            itemColor={ongoingItems.machine.itemColor}
          />
        )}
      </ItemViewContainerDiv>
      <BalancerView />
    </GameBoardDiv>
  );
};

export default GameBoardView;
