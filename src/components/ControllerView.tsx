import styled from '@emotion/styled';
import React from 'react';

const ControllerContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  height: 100px;
  padding-right: 100px;
`;

const ControlButton = styled.button`
  width: 80px;
  padding: 10px 15px;
`;

export const ControllerView = () => {
  return (
    <ControllerContainer>
      <ControlButton>Start</ControlButton>
      <ControlButton>Stop</ControlButton>
    </ControllerContainer>
  );
};

export default ControllerView;
