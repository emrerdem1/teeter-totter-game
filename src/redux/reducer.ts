import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getRandomItemWeight,
  getRandomFallingItemShape,
  calculateOffsetX,
  calculateScaleSize,
  getHorizontalPositionAfterMove,
  getVerticalPositionAfterMove,
  getRandomCellPositionX,
} from './utils';
import { uuid } from 'uuidv4';
import { RootState } from './store';
import { useAppDispatch } from './hooks';

const DEFAULT_VERTICAL_POSITION = 0;

export enum FallingItemShape {
  circle,
  triangle,
  rectangle,
}

export enum MoveDirection {
  left,
  right,
  bottom,
}

export interface FallingItem {
  id: string;
  weight: number;
  // Depends on the weight.
  scaleSize: number;
  offsetX: number;
  offsetY: number;
  cellPositionX: number;
  cellPositionY: number;
  itemShape: FallingItemShape;
}

interface CompetitorsItemOngoing {
  human: FallingItem;
  machine: FallingItem;
}

interface CompetitorsItemDone {
  human: FallingItem[];
  machine: FallingItem[];
}

interface GameState {
  isStarted: boolean;
  isStopped: boolean;
  isFinished: boolean;
  shouldProceedNextRound: boolean;
  ongoingItems: CompetitorsItemOngoing | null;
  doneItems: CompetitorsItemDone | null;
}

const initialState: GameState = {
  isStarted: false,
  isStopped: false,
  isFinished: false,
  shouldProceedNextRound: false,
  ongoingItems: null,
  doneItems: null,
};
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startNewGame: (state) => {
      state.isStarted = true;

      const humanItemWeight = getRandomItemWeight();
      const machineItemWeight = getRandomItemWeight();
      const humanCellPositionX = getRandomCellPositionX();
      const machineCellPositionX = getRandomCellPositionX();

      state.ongoingItems = {
        human: {
          id: uuid(),
          weight: humanItemWeight,
          scaleSize: calculateScaleSize(humanItemWeight),
          itemShape: getRandomFallingItemShape(),
          cellPositionX: humanCellPositionX,
          cellPositionY: DEFAULT_VERTICAL_POSITION,
          offsetY: DEFAULT_VERTICAL_POSITION,
          offsetX: calculateOffsetX(humanCellPositionX),
        },
        machine: {
          id: uuid(),
          weight: machineItemWeight,
          scaleSize: calculateScaleSize(machineItemWeight),
          itemShape: getRandomFallingItemShape(),
          cellPositionX: machineCellPositionX,
          cellPositionY: DEFAULT_VERTICAL_POSITION,
          offsetY: DEFAULT_VERTICAL_POSITION,
          offsetX: calculateOffsetX(machineCellPositionX),
        },
      };
    },
    proceedNextRound: (state) => {},
    stopCurrentGame: (state) => {
      return initialState;
    },
    continueCurrentGame: (state) => {},
    humanMove: (state, action: PayloadAction<MoveDirection>) => {
      const { human, machine } = state.ongoingItems!;

      state.ongoingItems = {
        human: {
          ...human,
          offsetY: getVerticalPositionAfterMove(human.offsetY, action.payload),
          offsetX: getHorizontalPositionAfterMove(
            human.offsetX,
            action.payload
          ),
        },
        machine: {
          ...machine,
          // Human move can only affect the vertical position of the machine item.
          offsetY: getVerticalPositionAfterMove(
            machine.offsetY,
            action.payload
          ),
        },
      };
    },
  },
});

export const { actions, reducer } = gameSlice;
export const { startNewGame, stopCurrentGame, continueCurrentGame, humanMove } =
  actions;

export const selectGame = (state: RootState) => state.gameSlice;

const rootReducer = combineReducers({ gameSlice: reducer });
export default rootReducer;
