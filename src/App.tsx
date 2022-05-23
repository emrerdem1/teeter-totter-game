import React from 'react';
import './App.scss';
import styled from '@emotion/styled';
import ContactView from './components/ContactView';
import ControllerView from './components/ControllerView';
import { PlaygroundView } from './components/PlaygroundView';

const InformationContainerDiv = styled.div`
  position: relative;
  margin-right: 100px;
`;

const App: React.FC = () => {
  return (
    <>
      <InformationContainerDiv>
        <ControllerView />
        <ContactView />
      </InformationContainerDiv>
      <PlaygroundView />
    </>
  );
};

export default App;
