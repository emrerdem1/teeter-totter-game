import styled from '@emotion/styled';
import React from 'react';
import { FallingItem, FallingItemShape } from '../redux/types';
import { MAX_ITEM_SIZE } from '../redux/constants';

interface FallingItemContainerProps {
  offsetX: number;
  offsetY: number;
  scaleSize: number;
  // To affect the items whose falling is completed.
  isInGoalLine?: boolean;
}

const FallingItemContainerDiv = styled.div<FallingItemContainerProps>`
  position: ${(props) => `${props.isInGoalLine ? 'relative' : 'absolute'}`};
  top: ${(props) => `${props.offsetY}px`};
  left: ${(props) => `${props.offsetX}px`};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${MAX_ITEM_SIZE}px;
  height: ${MAX_ITEM_SIZE}px;
  transform: scale(${(props) => props.scaleSize});
  display: ${(props) => `${props.isInGoalLine ? 'inline-block' : 'flex'}`};
`;

const SquareItemDiv = styled.div<{ itemColor: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => `${props.itemColor}`};
`;

const CircleItemDiv = styled(SquareItemDiv)`
  border-radius: 50%;
`;

const TriangleItemDiv = styled.div<{ itemColor: string }>`
  width: 0;
  height: 0;
  border-left: ${MAX_ITEM_SIZE / 2}px solid transparent;
  border-right: ${MAX_ITEM_SIZE / 2}px solid transparent;
  border-bottom: ${MAX_ITEM_SIZE}px solid ${(props) => props.itemColor};

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
  isInGoalLine?: boolean;
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
  isInGoalLine,
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
      isInGoalLine={isInGoalLine}
    >
      {getItemDivBasedOnShape(itemShape)}
    </FallingItemContainerDiv>
  );
};

export default ItemView;
