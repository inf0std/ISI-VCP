import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Programerreunio from "./component/Programmer/ProgramerLaReunion";



const App = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Programerreunio />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
