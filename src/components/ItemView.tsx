import styled from '@emotion/styled';
import React from 'react';

interface FallingItemProps {
  offsetX: number;
  offsetY: number;
}

const MIN_ITEM_SIZE = 30;

const FallingItemContainer = styled.div<FallingItemProps>`
  position: absolute;
  top: ${(props) => (props.offsetY ? `${props.offsetY}px` : '0')};
  left: ${(props) => (props.offsetX ? `${props.offsetX}px` : '0')};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${MIN_ITEM_SIZE}px;
  height: ${MIN_ITEM_SIZE}px;
`;

const SquareItem = styled.div`
  width: 100%;
  height: 100%;
  background: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleItem = styled(SquareItem)`
  border-radius: 50%;
`;

const TriangleItem = styled.div`
  width: 0;
  height: 0;
  border-left: ${MIN_ITEM_SIZE / 2}px solid transparent;
  border-right: ${MIN_ITEM_SIZE / 2}px solid transparent;
  border-bottom: ${MIN_ITEM_SIZE}px solid gray;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const getRandomFallingItem = (fallingItemList: JSX.Element[]): JSX.Element => {
  return fallingItemList[Math.floor(Math.random() * fallingItemList.length)];
};

export const ItemView = () => {
  let weight = 5;
  const weightIndicator = <span>{weight}</span>;
  // Only one of them should be falling at a time.
  const possibleFallingItems = [
    <TriangleItem>{weightIndicator}</TriangleItem>,
    <CircleItem>{weightIndicator}</CircleItem>,
    <SquareItem>{weightIndicator}</SquareItem>,
  ];

  return (
    <FallingItemContainer offsetX={30} offsetY={30}>
      {getRandomFallingItem(possibleFallingItems)}
    </FallingItemContainer>
  );
};

export default ItemView;
