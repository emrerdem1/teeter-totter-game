import styled from '@emotion/styled';
import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { FallingItem, selectGame } from '../redux/reducer';

const StatisticsContainerDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-between;
`;

const getTotalWeightPerSide = (fallingList: FallingItem[]) => {
  return fallingList
    .map((item) => item.unitTorque)
    .reduce((acc, curr) => acc + curr);
};

export const StatisticsView = () => {
  const { doneItems } = useAppSelector(selectGame);
  let humanWeight = 0;
  let machineWeight = 0;

  if (doneItems.human.length && doneItems.machine.length) {
    humanWeight = getTotalWeightPerSide(doneItems.human);
    machineWeight = getTotalWeightPerSide(doneItems.machine);
  }

  return (
    <StatisticsContainerDiv>
      <div>
        <p>Total weight: {humanWeight}</p>
      </div>
      <div>
        <p>Total weight: {machineWeight}</p>
      </div>
    </StatisticsContainerDiv>
  );
};

export default StatisticsView;
