
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home2 from './component/Home2/Home2';
// import ProgrammerReunio from './component/Programmer/ProgramerLaReunion';
// import ProgrammerLaConférance from './component/Programmer/ProgrammerLaConférance';
// import Programmerdébat from './component/Programmer/Programmerdébat';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={< ProgrammerLaConférance />} /> */}
          {/* <Route path="/" element={< Programmerdébat />} /> */}
          {/* <Route path="/" element={< ProgrammerReunio />} /> */}
          <Route path="/" element={<Home2 />} />
        </Routes>
      </BrowserRouter>



    </div>

  );
}

export default App;