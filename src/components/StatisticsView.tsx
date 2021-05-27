import styled from '@emotion/styled';
import React from 'react';

const StatisticsContainerDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-between;
`;

export const StatisticsView = () => {
  return (
    <StatisticsContainerDiv>
      <div>
        <p>Total weight: x</p>
        <p>Momentum: y</p>
      </div>
      <div>
        <p>Total weight: z</p>
        <p>Momentum: t</p>
      </div>
    </StatisticsContainerDiv>
  );
};

export default StatisticsView;
