import React from 'react';
import './App.scss';
import ContactView from './components/ContactView';
import ControllerView from './components/ControllerView';
import { PlaygroundView } from './components/PlaygroundView';

const App: React.FC = () => {
  return (
    <>
      <ControllerView />
      <PlaygroundView />
      <ContactView />
    </>
  );
}

export default App;
