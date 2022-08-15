import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from '../redux/hooks';
import { selectGame } from '../redux/reducer';
import { FallingItem } from '../redux/types';

const StatisticsContainerDiv = styled.div`
  display: flex;
  width: 50%;
  height: 60px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const getTotalWeightPerSide = (fallingList: FallingItem[]) =>
  fallingList.map((item) => item.unitTorque).reduce((acc, curr) => acc + curr);

interface ITeeterTotterWeights {
  humanSide: number;
  machineSide: number;
}

const INITIAL_WEIGHTS: ITeeterTotterWeights = {
  humanSide: 0,
  machineSide: 0,
};

export const StatisticsView: React.FC = () => {
  const [weights, setWeights] = useState<ITeeterTotterWeights>(INITIAL_WEIGHTS);
  const {
    doneItems: { human: humanSideWeights, machine: machineSideWeights },
  } = useAppSelector(selectGame);

  useEffect(() => {
    if (!humanSideWeights.length && !machineSideWeights.length) {
      setWeights(INITIAL_WEIGHTS);
      return;
    }

    setWeights((prevState) => ({
      ...prevState,
      humanSide: getTotalWeightPerSide(humanSideWeights),
      machineSide: getTotalWeightPerSide(machineSideWeights),
    }));
  }, [humanSideWeights, machineSideWeights]);

  return (
    <StatisticsContainerDiv>
      <div>
        <span>Humanity</span>
        <p>Total weight: {weights.humanSide}</p>
      </div>
      <div>
        <span>Skynet</span>
        <p>Total weight: {weights.machineSide}</p>
      </div>
    </StatisticsContainerDiv>
  );
};

export default StatisticsView;
