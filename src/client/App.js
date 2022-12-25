
<<<<<<< HEAD
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home2 from './component/Home2/Home2';
// import ProgrammerReunio from './component/Programmer/ProgramerLaReunion';
// import ProgrammerLaConférance from './component/Programmer/ProgrammerLaConférance';
// import Programmerdébat from './component/Programmer/Programmerdébat';
=======
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Contact from "./views/Contact";
import Chat from "./views/Chat";
import SignInSignUp from "./component/formulaire/modalForms/SignINSignUp";
import VideoRoom from './views/VideoRoom'
import Profile from "./component/Profile/Profile";


import Programmerdébat from './component/Programmer/Programmerdébat';

>>>>>>> f3118cb81921a8b75c53eca8c239597391279b93



function App() {
  return (
    
    <div>
<<<<<<< HEAD
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={< ProgrammerLaConférance />} /> */}
          {/* <Route path="/" element={< Programmerdébat />} /> */}
          {/* <Route path="/" element={< ProgrammerReunio />} /> */}
          <Route path="/" element={<Home2 />} />
        </Routes>
      </BrowserRouter>


=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/login" element={<SignInSignUp />} />
        <Route path="/VideoRoomUI" element={< VideoRoom/>} />
        <Route path="/profile" element={< Profile/>} />
        <Route path="/programmerdebat" element={< Programmerdébat />} />
      </Routes>
    </BrowserRouter>
    
   
>>>>>>> f3118cb81921a8b75c53eca8c239597391279b93

    </div>

  );
}

export default App;