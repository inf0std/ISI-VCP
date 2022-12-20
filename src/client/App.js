
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Programmerdébat from './component/Programmer/Programmerdébat';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Programmerdébat />} />

        </Routes>
      </BrowserRouter>



    </div>

  );
}

export default App;