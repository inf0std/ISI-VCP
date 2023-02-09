import config from "./config.json";
import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home2/Home2";
import Contact from "./views/Contact";
import Chat from "./views/Chat";
import VideoRoom from "./views/VideoRoum";
import Profile from "./component/Profile/Profile";
import ProgrammerReunion from "./component/formulaire/modalForms/ProgramerLaReunion";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState({ id: null, name: null, token: null });

  const changeUser = (id, name, token) => {
    setUser({ id, name, token });
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home user={user} changeUser={changeUser} />}
        />

        <Route
          path="/Contact/:id"
          element={<Contact user={user} changeUser={changeUser} />}
        />
        <Route
          path="/Chat/:id"
          element={<Chat user={user} changeUser={changeUser} />}
        />
        <Route
          path="/VideoRoomUI/:roomid/:userid"
          element={<VideoRoom user={user} changeUser={changeUser} />}
        />
        <Route
          path="/profile/:id"
          element={<Profile user={user} changeUser={changeUser} />}
        />
        <Route path="/programmer" element={<ProgrammerReunion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
