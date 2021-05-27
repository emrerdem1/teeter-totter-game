import React from 'react';
import './App.scss';
import ControllerView from './components/ControllerView';
import { PlaygroundView } from './components/PlaygroundView';

function App() {
  return (
    <>
      <ControllerView />
      <PlaygroundView />
    </>
  );
}

export default App;
