import { FallingItemShape } from './reducer';

const BASE_SCALE = 0.5;
const SCALE_AMOUNT = 0.05;
const MAX_ITEM_WEIGHT = 10;
export const MAX_ITEM_SIZE = 40;
export const HORIZONTAL_CELLS_COUNT = 5;

export const getRandomItemWeight = (): number => {
  return Math.floor(Math.random() * MAX_ITEM_WEIGHT + 1);
};

export const getRandomFallingItemShape = (): FallingItemShape => {
  return Math.floor(Math.random() * Object.keys(FallingItemShape).length);
};

export const getRandomOffsetX = (): number => {
  return MAX_ITEM_SIZE * Math.floor(Math.random() * HORIZONTAL_CELLS_COUNT);
};

export const calculateScaleSize = (weight: number): number => {
  return BASE_SCALE + weight * SCALE_AMOUNT;
};
