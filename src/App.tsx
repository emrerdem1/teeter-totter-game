import React from 'react';
import styled from '@emotion/styled';
import ContactView from './components/ContactView';
import ControllerView from './components/ControllerView';
import { PlaygroundView } from './components/PlaygroundView';

const InformationContainerDiv = styled.div`
  position: relative;
  margin-right: 100px;
`;

const AppContainerDiv = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 50px 0 200px;
`;

const App: React.FC = () => {
  return (
    <AppContainerDiv>
      <InformationContainerDiv>
        <ControllerView />
        <ContactView />
      </InformationContainerDiv>
      <PlaygroundView />
    </AppContainerDiv>
  );
};

export default App;
