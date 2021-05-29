import styled from '@emotion/styled';
import React from 'react';
import { FallingItem, FallingItemShape } from '../redux/reducer';
import { MAX_ITEM_SIZE } from '../redux/utils';

// https://stackoverflow.com/a/25821830
const getRandomHexColor = () =>
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');

interface FallingItemContainerProps {
  offsetX: number;
  offsetY: number;
  scaleSize: number;
}

const FallingItemContainerDiv = styled.div<FallingItemContainerProps>`
  position: absolute;
  top: ${(props) => `${props.offsetY}px`};
  left: ${(props) => `${props.offsetX}px`};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${MAX_ITEM_SIZE}px;
  height: ${MAX_ITEM_SIZE}px;
  transform: scale(${(props) => props.scaleSize});
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

export const ItemView: React.FC<
  Omit<FallingItem, 'cellPositionX' | 'cellPositionY'>
> = ({ weight, scaleSize, offsetX, offsetY, itemShape }) => {
  const fallingItemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (fallingItemRef && fallingItemRef.current) {
      console.log('Width ' + fallingItemRef.current.offsetWidth);
      console.log('Height ' + fallingItemRef.current.offsetHeight);
      console.log('Left ' + fallingItemRef.current.offsetLeft);
      console.log(fallingItemRef.current.getBoundingClientRect());
    }
  }, [fallingItemRef.current?.offsetLeft, fallingItemRef.current?.offsetTop]);

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
      ref={fallingItemRef}
      offsetX={offsetX}
      offsetY={offsetY}
      scaleSize={scaleSize}
    >
      {getItemDivBasedOnShape(itemShape)}
    </FallingItemContainerDiv>
  );
};

export default ItemView;
