import { FallingItemShape, MoveDirection } from './reducer';

const BASE_SCALE = 0.5;
const SCALE_AMOUNT = 0.05;
const MAX_ITEM_WEIGHT = 10;
export const MAX_ITEM_SIZE = 40;
export const HORIZONTAL_CELLS_COUNT = 5;
export const VERTICAL_CELLS_COUNT = 7;

export const getRandomItemWeight = (): number => {
  return Math.floor(Math.random() * MAX_ITEM_WEIGHT + 1);
};

export const getRandomFallingItemShape = (): number => {
  return Math.floor((Math.random() * Object.keys(FallingItemShape).length) / 2);
};

export const calculateOffsetX = (cellPositionX: number): number => {
  // 0 is exclusive given that we want to multiple the position
  // by the weight to calculate the momentum. So we need to exclude
  // the cell's own size to get accurate coordinate.
  return MAX_ITEM_SIZE * cellPositionX - MAX_ITEM_SIZE;
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
) => {
  switch (move) {
    case MoveDirection.left:
      return positionX + MAX_ITEM_SIZE;
    case MoveDirection.right:
      return positionX + MAX_ITEM_SIZE;
    default:
      return positionX;
  }
};

export const getVerticalPositionAfterMove = (
  positionY: number,
  move: MoveDirection
) => {
  switch (move) {
    case MoveDirection.bottom:
      return positionY + MAX_ITEM_SIZE;
    default:
      return positionY;
  }
};
