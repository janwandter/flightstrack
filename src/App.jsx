import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesFunction from './Routes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <RoutesFunction />
      </BrowserRouter>
    </div>
  );
}

export default App;

