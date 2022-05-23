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
  itemColor: string;
  itemShape: FallingItemShape;
  unitTorque: number;
}

export interface CompetitorsItemOngoing {
  human: FallingItem;
  machine: FallingItem;
}

export interface CompetitorsItemDone {
  human: FallingItem[];
  machine: FallingItem[];
}

export interface GameState {
  isStarted: boolean;
  isStopped: boolean;
  isFinished: boolean;
  hasReachedGoalLine: boolean;
  speedLevel: number;
  ongoingItems: CompetitorsItemOngoing | null;
  doneItems: CompetitorsItemDone;
  torque: number;
}
