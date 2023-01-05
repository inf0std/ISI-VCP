import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Contact from "./views/Contact";
import Dashbord from "./views/dash";
import Dash from "./dash/Dash";
import Chat from "./views/Chat";
import SignInSignUp from "./component/formulaire/modalForms/SignINSignUp";
import VideoRoom from "./views/VideoRoom";
import Profile from "./component/Profile/Profile";
import Programmerdébat from "./component/Programmer/Programmerdébat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Dashbord" element={<Dashbord />} />
        <Route path="/Dash" element={<Dash />} />
        <Route path="/login" element={<SignInSignUp />} />
        <Route path="/VideoRoomUI" element={<VideoRoom />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/programmer" element={<Programmerdébat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
