import styled from '@emotion/styled';
import React from 'react';

interface FallingItemProps {
  offsetX: number;
  offsetY: number;
  size: number;
}

const MIN_ITEM_SIZE = 25;
const MIN_ITEM_SIZE_INCREMENT = 5;
const MAX_ITEM_WEIGHT = 9;

const FallingItemContainerDiv = styled.div<FallingItemProps>`
  position: absolute;
  top: ${(props) => `${props.offsetY}px`};
  left: ${(props) => `${props.offsetX}px`};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
`;

const SquareItemDiv = styled.div`
  width: 100%;
  height: 100%;
  background: gray;
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
  border-bottom: ${(props) => `${props.size}px`} solid gray;

  span {
    position: absolute;
    // Number centered in triangle does not look centered
    // precisely. Make it look centered by increasing the top for now.
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const getRandomFallingItem = (fallingItemList: JSX.Element[]): JSX.Element => {
  return fallingItemList[Math.floor(Math.random() * fallingItemList.length)];
};

const getRandomItemWeight = (max: number) => {
  return Math.floor(Math.random() * max + 1);
};

export const ItemView = () => {
  let weight = getRandomItemWeight(MAX_ITEM_WEIGHT);
  const weightIndicator = <span>{weight}</span>;
  const fallingItemSize = MIN_ITEM_SIZE + MIN_ITEM_SIZE_INCREMENT * weight;

  // Only one of them should be falling at a time.
  const possibleFallingItems = [
    <TriangleItemDiv size={fallingItemSize}>{weightIndicator}</TriangleItemDiv>,
    <CircleItemDiv>{weightIndicator}</CircleItemDiv>,
    <SquareItemDiv>{weightIndicator}</SquareItemDiv>,
  ];

  return (
    <FallingItemContainerDiv offsetX={30} offsetY={30} size={fallingItemSize}>
      {getRandomFallingItem(possibleFallingItems)}
    </FallingItemContainerDiv>
  );
};

export default ItemView;
