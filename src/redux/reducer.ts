import { combineReducers, createSlice } from '@reduxjs/toolkit';
import {
  getRandomItemWeight,
  getRandomFallingItemShape,
  getRandomOffsetX,
  calculateScaleSize,
} from './utils';
import { uuid } from 'uuidv4';
import { RootState } from './store';

const DEFAULT_VERTICAL_POSITION = 0;

export enum FallingItemShape {
  circle,
  triangle,
  rectangle,
}

export interface FallingItem {
  id: string;
  weight: number;
  // Depends on the weight.
  scaleSize: number;
  offsetX: number;
  offsetY: number;
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
      const humanItemWeight = getRandomItemWeight();
      const machineItemWeight = getRandomItemWeight();
      state.isStarted = true;

      state.ongoingItems = {
        human: {
          id: uuid(),
          weight: humanItemWeight,
          scaleSize: calculateScaleSize(humanItemWeight),
          itemShape: getRandomFallingItemShape(),
          offsetY: DEFAULT_VERTICAL_POSITION,
          offsetX: getRandomOffsetX(),
        },
        machine: {
          id: uuid(),
          weight: machineItemWeight,
          scaleSize: calculateScaleSize(machineItemWeight),
          itemShape: getRandomFallingItemShape(),
          offsetY: DEFAULT_VERTICAL_POSITION,
          offsetX: getRandomOffsetX(),
        },
      };
    },
    proceedNextRound: (state) => {},
    stopCurrentGame: (state) => {
      return state;
    },
  },
});

export const { actions, reducer } = gameSlice;
export const { startNewGame, stopCurrentGame } = actions;

export const selectGame = (state: RootState) => state.gameSlice;

const rootReducer = combineReducers({ gameSlice: reducer });
export default rootReducer;
