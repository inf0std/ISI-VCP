import config from "./config.json";
import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home2/Home2";
import Contact from "./views/Contact";
//import Chat from "./views/Chat";
import VideoRoom from "./views/VideoRoum";
import Profile from "./component/Profile/Profile";
import ProgrammerReunion from "./component/formulaire/modalForms/ProgramerLaReunion";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  //state declaration

  const [convs, setConvs] = useState([]);
  const [user, setUser] = useState({ id: null, name: null });
  //const socket = useRef(s);

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
        <Route path="/videoRoom/:uid/:rid" element={<VideoRoom />} />
        <Route
          path="/Contact/:id"
          element={<Contact user={user} changeUser={changeUser} />}
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
