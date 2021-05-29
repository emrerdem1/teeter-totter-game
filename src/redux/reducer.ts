import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getRandomItemWeight,
  getRandomFallingItemShape,
  calculateOffset,
  calculateScaleSize,
  getHorizontalPositionAfterMove,
  getVerticalPositionAfterMove,
  getRandomCellPositionX,
  DEFAULT_VERTICAL_POSITION,
} from './utils';
import { uuid } from 'uuidv4';
import { RootState } from './store';

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
          offsetX: calculateOffset(humanCellPositionX),
        },
        machine: {
          id: uuid(),
          weight: machineItemWeight,
          scaleSize: calculateScaleSize(machineItemWeight),
          itemShape: getRandomFallingItemShape(),
          cellPositionX: machineCellPositionX,
          cellPositionY: DEFAULT_VERTICAL_POSITION,
          offsetY: DEFAULT_VERTICAL_POSITION,
          offsetX: calculateOffset(machineCellPositionX),
        },
      };
    },
    proceedNextRound: (state) => {},
    stopCurrentGame: (state) => {
      return initialState;
    },
    continueCurrentGame: (state) => {},
    move: (state, action: PayloadAction<MoveDirection>) => {
      const { human, machine } = state.ongoingItems!;

      const possibleNewHumanCellPositionX = getHorizontalPositionAfterMove(
        human.cellPositionX,
        action.payload
      );
      const possibleNewHumanCellPositionY = getVerticalPositionAfterMove(
        human.cellPositionY,
        action.payload
      );
      const possibleNewMachineCellPositionY = getVerticalPositionAfterMove(
        machine.cellPositionY,
        action.payload
      );

      state.ongoingItems = {
        human: {
          ...human,
          cellPositionY: getVerticalPositionAfterMove(
            human.cellPositionY,
            action.payload
          ),
          cellPositionX: getHorizontalPositionAfterMove(
            human.cellPositionX,
            action.payload
          ),
          offsetY: calculateOffset(possibleNewHumanCellPositionY),
          offsetX: calculateOffset(possibleNewHumanCellPositionX),
        },
        machine: {
          ...machine,
          // Human move can only affect the vertical position of the machine item.
          cellPositionY: possibleNewMachineCellPositionY,
          offsetY: calculateOffset(possibleNewMachineCellPositionY),
        },
      };
    },
  },
});

export const { actions, reducer } = gameSlice;
export const { startNewGame, stopCurrentGame, continueCurrentGame, move } =
  actions;

export const selectGame = (state: RootState) => state.gameSlice;

const rootReducer = combineReducers({ gameSlice: reducer });
export default rootReducer;
