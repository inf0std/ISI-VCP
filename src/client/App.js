import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Contact from "./views/Contact";
//import Dashbord from "./views/dash";
//import Dash from "./dash/Dash";
import Chat from "./views/Chat";
import VideoRoom from "./views/VideoRoom";
import Profile from "./component/Profile/Profile";
import ProgrammerReunion from "./component/formulaire/modalForms/ProgramerLaReunion";
import socketIOClient from "socket.io-client";

function App() {
  //state declaration
  const [convs, setConvs] = useState([]);
  const [user, setUser] = useState({ id: null, name: null });

  /////
  /*
  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/user/${user.id}/conversations`, {
      method: "GET",
      headers: { Accept: "Application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        setConvs(result);
      })
      .catch((err) => console.log(err));
  }, []);*/

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
        <Route path="/Contact" element={<Contact user={user} />} />
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
