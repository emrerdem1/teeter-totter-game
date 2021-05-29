import styled from '@emotion/styled';
import React from 'react';
import { FallingItem, FallingItemShape } from '../redux/types';
import { MAX_ITEM_SIZE } from '../redux/constants';

// https://stackoverflow.com/a/25821830
const getRandomHexColor = () =>
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');

interface FallingItemContainerProps {
  offsetX: number;
  offsetY: number;
  scaleSize: number;
  isRelative?: boolean;
}

const FallingItemContainerDiv = styled.div<FallingItemContainerProps>`
  position: ${(props) => `${props.isRelative ? 'relative' : 'absolute'}`};

  top: ${(props) => `${props.offsetY}px`};
  left: ${(props) => `${props.offsetX}px`};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${MAX_ITEM_SIZE}px;
  height: ${MAX_ITEM_SIZE}px;
  transform: scale(${(props) => props.scaleSize});
  display: ${(props) => `${props.isRelative ? 'inline-block' : 'flex'}`};
`;

const SquareItemDiv = styled.div`
  width: 100%;
  height: 100%;
  background: #${getRandomHexColor()};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleItemDiv = styled(SquareItemDiv)`
  border-radius: 50%;
`;

const TriangleItemDiv = styled.div<{ scaleSize: number }>`
  width: 0;
  height: 0;
  border-left: ${MAX_ITEM_SIZE / 2}px solid transparent;
  border-right: ${MAX_ITEM_SIZE / 2}px solid transparent;
  border-bottom: ${MAX_ITEM_SIZE}px solid #${getRandomHexColor()};

  span {
    position: absolute;
    // Number centered in triangle does not look centered
    // precisely. Make it look centered by increasing the top for now.
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

interface Deneme {
  isTr?: boolean;
}

export const ItemView: React.FC<
  Omit<FallingItem, 'cellPositionX' | 'cellPositionY' | 'unitTorque'> & Deneme
> = ({ weight, scaleSize, offsetX, offsetY, itemShape, isTr }) => {
  const weightIndicatorText = <span>{weight}</span>;

  const getItemDivBasedOnShape = (shape: FallingItemShape) => {
    switch (shape) {
      case FallingItemShape.circle:
        return <CircleItemDiv>{weightIndicatorText}</CircleItemDiv>;
      case FallingItemShape.rectangle:
        return <SquareItemDiv>{weightIndicatorText}</SquareItemDiv>;
      case FallingItemShape.triangle:
        return (
          <TriangleItemDiv scaleSize={scaleSize}>
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
      isRelative={isTr}
    >
      {getItemDivBasedOnShape(itemShape)}
    </FallingItemContainerDiv>
  );
};

export default ItemView;
