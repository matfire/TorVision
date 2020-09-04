import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

function App() {

  return (
    <div className="bg-customWhite w-100 h-full">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
    </div>
  );
}

export default App;
