import { FallingItemShape, MoveDirection } from './reducer';

const BASE_SCALE = 0.5;
const SCALE_AMOUNT = 0.05;
const MAX_ITEM_WEIGHT = 10;
export const MAX_ITEM_SIZE = 40;
export const HORIZONTAL_CELLS_COUNT = 5;
export const VERTICAL_CELLS_COUNT = 7;
export const DEFAULT_VERTICAL_POSITION = 1;

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
) => {
  switch (move) {
    case MoveDirection.left:
      if (positionX > 1) {
        return positionX - 1;
      }
      return positionX;
    case MoveDirection.right:
      if (positionX < HORIZONTAL_CELLS_COUNT) {
        return positionX + 1;
      }
      return positionX;
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
      if (positionY != VERTICAL_CELLS_COUNT) {
        return positionY + 1;
      }
      return positionY;
    default:
      return positionY;
  }
};
