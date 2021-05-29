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
  VERTICAL_CELLS_COUNT,
  DEFAULT_SPEED_LEVEL,
  SPEED_INCREMENT_STEP,
  MAX_TORQUE,
  HORIZONTAL_CELLS_COUNT,
  calculateTorqueOfFallingItem,
  reverseHorizontalCellPosition,
} from './utils';
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
  weight: number;
  // Depends on the weight.
  scaleSize: number;
  offsetX: number;
  offsetY: number;
  cellPositionX: number;
  cellPositionY: number;
  itemShape: FallingItemShape;
  unitTorque: number;
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
  hasReachedGoalLine: boolean;
  speedLevel: number;
  ongoingItems: CompetitorsItemOngoing | null;
  doneItems: CompetitorsItemDone;
  torque: number;
}

const initialState: GameState = {
  isStarted: false,
  isStopped: false,
  isFinished: false,
  hasReachedGoalLine: false,
  speedLevel: DEFAULT_SPEED_LEVEL,
  ongoingItems: null,
  doneItems: { human: [], machine: [] },
  torque: 0,
};
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startNewGame: (state) => {
      state = { ...initialState, isStarted: true };
      return state;
    },
    startNewRound: (state) => {
      const humanItemWeight = getRandomItemWeight();
      const machineItemWeight = getRandomItemWeight();
      const humanCellPositionX = getRandomCellPositionX();
      const machineCellPositionX = getRandomCellPositionX();
      const machineTorque = machineItemWeight * machineCellPositionX;

      state.ongoingItems = {
        human: {
          weight: humanItemWeight,
          scaleSize: calculateScaleSize(humanItemWeight),
          itemShape: getRandomFallingItemShape(),
          cellPositionX: humanCellPositionX,
          cellPositionY: DEFAULT_VERTICAL_POSITION,
          offsetY: DEFAULT_VERTICAL_POSITION,
          offsetX: calculateOffset(humanCellPositionX),
          unitTorque: calculateTorqueOfFallingItem(
            humanItemWeight,
            humanCellPositionX
          ),
        },
        machine: {
          weight: machineItemWeight,
          scaleSize: calculateScaleSize(machineItemWeight),
          itemShape: getRandomFallingItemShape(),
          cellPositionX: machineCellPositionX,
          cellPositionY: DEFAULT_VERTICAL_POSITION,
          offsetY: DEFAULT_VERTICAL_POSITION,
          offsetX: calculateOffset(machineCellPositionX),
          unitTorque: machineTorque,
        },
      };
    },
    move: (state, action: PayloadAction<MoveDirection>) => {
      const { human, machine } = state.ongoingItems!;

      const possibleNewHumanCellPositionX = getHorizontalPositionAfterMove(
        human.cellPositionX,
        action.payload
      );
      const possibleNewCellPositionY = getVerticalPositionAfterMove(
        human.cellPositionY,
        action.payload
      );
      const mutualVerticalOffset = calculateOffset(possibleNewCellPositionY);

      state.ongoingItems = {
        human: {
          ...human,
          cellPositionY: possibleNewCellPositionY,
          cellPositionX: possibleNewHumanCellPositionX,
          offsetY: mutualVerticalOffset,
          offsetX: calculateOffset(possibleNewHumanCellPositionX),
          unitTorque: calculateTorqueOfFallingItem(
            human.weight,
            reverseHorizontalCellPosition(
              HORIZONTAL_CELLS_COUNT,
              possibleNewHumanCellPositionX
            )
          ),
        },
        machine: {
          ...machine,
          // Human move can only affect the vertical position of the machine item.
          cellPositionY: possibleNewCellPositionY,
          offsetY: mutualVerticalOffset,
        },
      };
      state.hasReachedGoalLine =
        possibleNewCellPositionY === VERTICAL_CELLS_COUNT;
    },
    autoMove: (state, action: PayloadAction<MoveDirection>) => {
      const { human, machine } = state.ongoingItems!;

      const possibleNewCellPositionY = getVerticalPositionAfterMove(
        human.cellPositionY,
        action.payload
      );
      // Auto move can only affect the vertical position for now.
      // TODO(emrerdem1): You should implement logical calculations
      // to place items in order to preserve the balacan as much as possible.
      const mutualVerticalOffset = calculateOffset(possibleNewCellPositionY);

      state.ongoingItems = {
        human: {
          ...human,
          cellPositionY: possibleNewCellPositionY,
          offsetY: mutualVerticalOffset,
        },
        machine: {
          ...machine,
          cellPositionY: possibleNewCellPositionY,
          offsetY: mutualVerticalOffset,
        },
      };
      state.hasReachedGoalLine =
        possibleNewCellPositionY === VERTICAL_CELLS_COUNT;
    },
    saveCurrentRound: (state) => {
      state.speedLevel += SPEED_INCREMENT_STEP;
      state.hasReachedGoalLine = false;

      const { human: humanFellItem, machine: machineFellItem } =
        state.ongoingItems!;
      const calculatedTorque =
        (humanFellItem.unitTorque - machineFellItem.unitTorque) * -1;

      state.doneItems.human.push(humanFellItem);
      state.doneItems.machine.push(machineFellItem);
      state.ongoingItems = null;
      state.torque += calculatedTorque;
      if (state.torque >= MAX_TORQUE) {
        state.isFinished = true;
        state.torque = MAX_TORQUE;
      }
    },
    toggleCurrentGameFlow: (state) => {
      state.isStopped = !state.isStopped;
    },
  },
});

export const { actions, reducer } = gameSlice;
export const {
  startNewGame,
  toggleCurrentGameFlow,
  move,
  autoMove,
  startNewRound,
  saveCurrentRound,
} = actions;

export const selectGame = (state: RootState) => state.gameSlice;

const rootReducer = combineReducers({ gameSlice: reducer });
export default rootReducer;
