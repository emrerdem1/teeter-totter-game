import styled from '@emotion/styled';
import React from 'react';
import { FallingItem, FallingItemShape } from '../redux/types';
import { CELL_UNIT_SIZE } from '../redux/constants';

const MIN_WEIGHT_TEXT_SIZE = 28;

interface FallingItemContainerProps {
  offsetX: number;
  offsetY: number;
  scaleSize: number;
  // To affect the items whose falling is completed.
  hasReachedGoalLine?: boolean;
}

const FallingItemContainerDiv = styled.div<FallingItemContainerProps>`
  position: absolute;
  top: ${(props) =>
    props.hasReachedGoalLine ? 'unset' : `${props.offsetY}px`};
  bottom: ${(props) => `${props.hasReachedGoalLine ? '0' : 'unset'}`};
  left: ${(props) => `${props.offsetX}px`};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${CELL_UNIT_SIZE}px;
  height: ${CELL_UNIT_SIZE}px;
  transform: scale(${(props) => props.scaleSize});
`;

const SquareItemDiv = styled.div<{ itemColor: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => `${props.itemColor}`};
  font-size: ${MIN_WEIGHT_TEXT_SIZE}px;
`;

const CircleItemDiv = styled(SquareItemDiv)`
  border-radius: 50%;
`;

const TriangleItemDiv = styled.div<{ itemColor: string }>`
  width: 0;
  height: 0;
  border-left: ${CELL_UNIT_SIZE / 2}px solid transparent;
  border-right: ${CELL_UNIT_SIZE / 2}px solid transparent;
  border-bottom: ${CELL_UNIT_SIZE}px solid ${(props) => props.itemColor};
  font-size: ${MIN_WEIGHT_TEXT_SIZE}px;

  span {
    position: absolute;
    // Number centered in triangle does not look centered
    // precisely. Make it look centered by increasing the top for now.
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

interface FallingItemInGoalLine {
  hasReachedGoalLine?: boolean;
}

export const ItemView: React.FC<
  Omit<FallingItem, 'cellPositionX' | 'cellPositionY' | 'unitTorque'> &
    FallingItemInGoalLine
> = ({
  weight,
  scaleSize,
  offsetX,
  offsetY,
  itemShape,
  itemColor,
  hasReachedGoalLine,
}) => {
  const weightIndicatorText = <span>{weight}</span>;

  const getItemDivBasedOnShape = (shape: FallingItemShape) => {
    switch (shape) {
      case FallingItemShape.circle:
        return (
          <CircleItemDiv itemColor={itemColor}>
            {weightIndicatorText}
          </CircleItemDiv>
        );
      case FallingItemShape.rectangle:
        return (
          <SquareItemDiv itemColor={itemColor}>
            {weightIndicatorText}
          </SquareItemDiv>
        );
      case FallingItemShape.triangle:
        return (
          <TriangleItemDiv itemColor={itemColor}>
            {weightIndicatorText}
          </TriangleItemDiv>
        );
    }
  };

  return (
    <FallingItemContainerDiv
      offsetX={offsetX}
      offsetY={offsetY}
      scaleSize={scaleSize}
      hasReachedGoalLine={hasReachedGoalLine}
    >
      {getItemDivBasedOnShape(itemShape)}
    </FallingItemContainerDiv>
  );
};

export default ItemView;
