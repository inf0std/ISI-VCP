import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Contact from "./views/Contact";
//import Dashbord from "./views/dash";
//import Dash from "./dash/Dash";
import Chat from "./views/Chat";
import SignInSignUp from "./component/formulaire/modalForms/SignINSignUp";
import VideoRoom from "./views/VideoRoom";
import Profile from "./component/Profile/Profile";
import ProgrammerReunion from "./component/formulaire/modalForms/ProgramerLaReunion";

const convs = [
  {
    name: "conv-1",
    msgs: [
      {
        senderId: 1,
        content: "hello",
      },
      {
        senderId: 2,
        content: "hello there",
      },
      {
        senderId: 1,
        content: "how are you doing",
        seen: true,
      },
    ],
  },
  {
    name: "conv-2",
    msgs: [
      {
        senderId: 1,
        content: "hello",
      },
      {
        senderId: 2,
        content: "hello there",
      },
      {
        senderId: 1,
        content: "how are you doing",
      },
      {
        senderId: 1,
        content: "fine, how about you",
        seen: false,
      },
    ],
  },
];

function App() {
  const [user, setUser] = useState({ id: null, name: null });

  const state = {
    _user: user,
  };
  const changeUser = (userId, userName) => {
    setUser({ id: userId, name: userName });
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home handlers={{ handleChangeUser: changeUser }} state={state} />
          }
        />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Chat" element={<Chat convs={convs} />} />
        {
          //<Route path="/Dashbord" element={<Dashbord />} />
          //<Route path="/Dash" element={<Dash />} />
        }
        <Route path="/VideoRoomUI" element={<VideoRoom state={state} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/programmer" element={<ProgrammerReunion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
