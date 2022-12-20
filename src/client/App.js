
<<<<<<< HEAD
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Contact from "./views/Contact";
import Chat from "./views/Chat";
import SignInSignUp from "./component/formulaire/modalForms/SignINSignUp";
import VideoRoom from './views/VideoRoom'
import Navbarprofile from "./component/Profile/Navbarprofile";
import DefaultNav from "./component/navBars/DefaultNav";
import Profile from "./component/Profile/Profile";
=======
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Programmerdébat from './component/Programmer/Programmerdébat';
>>>>>>> 5063e215bcb030193c0c22aa5eabed86c25e44d9



function App() {
  return (
    <div>
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbarprofile />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/login" element={<SignInSignUp />} />
        <Route path="/VideoRoomUI" element={< VideoRoom/>} />
        <Route path="/profile" element={< Profile/>} />
      </Routes>
    </BrowserRouter>
    
   
=======
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Programmerdébat />} />

        </Routes>
      </BrowserRouter>


>>>>>>> 5063e215bcb030193c0c22aa5eabed86c25e44d9

    </div>

  );
}

export default App;