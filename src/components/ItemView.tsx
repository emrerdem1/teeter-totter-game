import styled from '@emotion/styled';
import React from 'react';
import { MAX_ITEM_SIZE } from '../redux/utils';

// https://stackoverflow.com/a/25821830
const getRandomHexColor = () =>
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');

interface FallingItemProps {
  offsetX: number;
  offsetY: number;
  scaleSize: number;
}

const FallingItemContainerDiv = styled.div<FallingItemProps>`
  position: absolute;
  top: ${(props) => `${props.offsetY}px`};
  left: ${(props) => `${props.offsetX}px`};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${MAX_ITEM_SIZE}px;
  height: ${MAX_ITEM_SIZE}px;
  transform: scale(${(props) => `${props.scaleSize}px`});
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

const TriangleItemDiv = styled.div<{ size: number }>`
  width: 0;
  height: 0;
  border-left: ${(props) => `${props.size / 2}px`} solid transparent;
  border-right: ${(props) => `${props.size / 2}px`} solid transparent;
  border-bottom: ${(props) => `${props.size}px`} solid #${getRandomHexColor()};

  span {
    position: absolute;
    // Number centered in triangle does not look centered
    // precisely. Make it look centered by increasing the top for now.
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const ItemView = () => {
  let weight = 5;
  const weightIndicator = <span>{weight}</span>;
  const fallingItemSize = weight;

  // Only one of them should be falling at a time.
  const possibleFallingItems = [
    <TriangleItemDiv size={30}>{weightIndicator}</TriangleItemDiv>,
    <CircleItemDiv>{weightIndicator}</CircleItemDiv>,
    <SquareItemDiv>{weightIndicator}</SquareItemDiv>,
  ];

  return (
    <FallingItemContainerDiv
      offsetX={30}
      offsetY={30}
      scaleSize={fallingItemSize}
    ></FallingItemContainerDiv>
  );
};

export default ItemView;
