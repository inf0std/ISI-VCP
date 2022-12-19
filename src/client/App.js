
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Contact from "./views/Contact";
import Chat from "./views/Chat";
import SignInSignUp from "./component/formulaire/modalForms/SignINSignUp";
import VideoRoom from './views/VideoRoom'
import Navbarprofile from "./component/Profile/Navbarprofile";
import DefaultNav from "./component/navBars/DefaultNav";


const App = (props) => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbarprofile />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/login" element={<SignInSignUp />} />
        <Route path="/VideoRoomUI" element={< VideoRoom/>} />
      </Routes>
    </BrowserRouter>
    
   

    </div>

  );
};

export default App;
