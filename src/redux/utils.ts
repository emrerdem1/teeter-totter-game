import {
  MAX_ITEM_WEIGHT,
  MAX_ITEM_SIZE,
  HORIZONTAL_CELLS_COUNT,
  SCALE_AMOUNT,
  BASE_SCALE,
} from './constants';
import { FallingItemShape, MoveDirection } from './types';

export const getRandomItemWeight = (): number => {
  return Math.floor(Math.random() * MAX_ITEM_WEIGHT + 1);
};

export const getRandomFallingItemShape = (): number => {
  return Math.floor((Math.random() * Object.keys(FallingItemShape).length) / 2);
};

export const calculateOffset = (cellPosition: number): number => {
  // 0 is exclusive given that we want to multiple the position
  // by the weight to calculate the momentum. So we need to exclude
  // the cell's own size to get accurate coordinate.
  return MAX_ITEM_SIZE * cellPosition - MAX_ITEM_SIZE;
};

export const getRandomCellPositionX = (): number => {
  return Math.floor(Math.random() * HORIZONTAL_CELLS_COUNT + 1);
};

export const calculateScaleSize = (weight: number): number => {
  return BASE_SCALE + weight * SCALE_AMOUNT;
};

export const getHorizontalPositionAfterMove = (
  positionX: number,
  move: MoveDirection
): number => {
  switch (move) {
    case MoveDirection.left:
      return positionX - 1;
    case MoveDirection.right:
      return positionX + 1;
    default:
      return positionX;
  }
};

export const getVerticalPositionAfterMove = (
  positionY: number,
  move: MoveDirection
): number => {
  switch (move) {
    case MoveDirection.bottom:
      return positionY + 1;
    default:
      return positionY;
  }
};

// https://en.wikipedia.org/wiki/Torque
export const calculateTorqueOfFallingItem = (
  mass: number,
  distance: number
): number => {
  return mass * distance;
};

/*
 * Positions start from 1 to the max count, hence
 * the left side has to be reversed to accurate calculation.
 * Note that this should only be applied to the left side.
 */
export const reverseHorizontalCellPosition = (
  maxCount: number,
  currentPosition: number
): number => {
  return maxCount - currentPosition + 1;
};

// https://stackoverflow.com/a/25821830
export const getRandomHexColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
