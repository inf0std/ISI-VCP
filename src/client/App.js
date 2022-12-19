
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ProgrammerReunio from './component/Programmer/ProgramerLaReunion';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProgrammerReunio />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;