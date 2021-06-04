import styled from '@emotion/styled';
import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { selectGame } from '../redux/reducer';
import ItemView from './ItemView';

const TOTTER_LINE_HEIGHT = 5;
const TOTTER_BALANCER_HEIGHT = 100;

const TotterBaseDiv = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-end;
  justify-content: center;
`;

const TotterLineDiv = styled.div<{ torque: number }>`
  width: 100%;
  height: 100%;
  transform: rotate(${(props) => props.torque ?? '0'}deg);
  transform-origin: bottom;
  display: flex;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: ${TOTTER_LINE_HEIGHT}px;
    background-color: red;
  }
`;

const DoneItemsContainerDiv = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
`;

const TriangleDiv = styled.div`
  width: 0;
  height: 0;
  border-left: ${TOTTER_BALANCER_HEIGHT / 3}px solid transparent;
  border-right: ${TOTTER_BALANCER_HEIGHT / 3}px solid transparent;
  border-bottom: ${TOTTER_BALANCER_HEIGHT}px solid gray;
`;

const BalancerView: React.FC = () => {
  const { doneItems, torque } = useAppSelector(selectGame);

  return (
    <TotterBaseDiv>
      <TotterLineDiv torque={torque}>
        <DoneItemsContainerDiv>
          {doneItems?.human.map((d, idx) => (
            <ItemView
              // TODO(emrerdem1): You should consider having ID
              //or something equivalent for sorting etc.
              key={idx + d.offsetX + d.offsetY}
              weight={d.weight}
              scaleSize={d.scaleSize}
              offsetX={d.offsetX}
              offsetY={d.offsetY}
              itemShape={d.itemShape}
              itemColor={d.itemColor}
              hasReachedGoalLine={true}
            />
          ))}
        </DoneItemsContainerDiv>
        <DoneItemsContainerDiv>
          {doneItems?.machine.map((d, idx) => (
            <ItemView
              // TODO(emrerdem1): You should consider having ID
              //or something equivalent for sorting etc.
              key={idx + d.offsetX + d.offsetY}
              weight={d.weight}
              scaleSize={d.scaleSize}
              offsetX={d.offsetX}
              offsetY={d.offsetY}
              itemShape={d.itemShape}
              itemColor={d.itemColor}
              hasReachedGoalLine={true}
            />
          ))}
        </DoneItemsContainerDiv>
      </TotterLineDiv>
      <TriangleDiv></TriangleDiv>
    </TotterBaseDiv>
  );
};

export default BalancerView;
