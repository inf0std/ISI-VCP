import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home2/Home2";
import Contact from "./views/Contact";
import Chat from "./views/Chat";
import VideoRoom from "./views/VideoRoom";
import Profile from "./component/Profile/Profile";
import ProgrammerReunion from "./component/formulaire/modalForms/ProgramerLaReunion";
import { getConversations } from "./utils/fetchUtils";
import "bootstrap/dist/css/bootstrap.min.css";

let socket = io.connect("http://localhost:8080");
function App() {
  //state declaration
  const [convs, setConvs] = useState([]);
  const [user, setUser] = useState({ id: null, name: null });
  let localVars = {
    user,
    convs,
  };

  useEffect(() => {
    if (user.id) {
      let socket = io("http://127.0.0.1:8080");
      socket.emit("joinRoom", { room: `user-${user.id}` });
      localVars.socket = socket;
      getConversations(user.id).then((convs) => setConvs(convs));
    } else setConvs([]);
  }, [user]);

  const changeUser = (userId, userName) => {
    setUser({ id: userId, name: userName });
  };

  const generalHandler = {
    changeUser,
  };
  return (
    <BrowserRouter>
      {console.log("APP", user)}
      <Routes>
        <Route
          path="/"
          element={
            <Home generalHandler={generalHandler} localVars={localVars} />
          }
        />
        <Route
          path="/Contact"
          element={
            <Contact generalHandler={generalHandler} localVars={localVars} />
          }
        />
        <Route
          path="/Chat"
          element={
            <Chat generalHandler={generalHandler} localVars={localVars} />
          }
        />
        <Route
          path="/VideoRoomUI/:id"
          element={
            <VideoRoom generalHandler={generalHandler} localVars={localVars} />
          }
        />
        <Route
          path="/profile/:id"
          generalHandler={generalHandler}
          element={
            <Profile generalHandler={generalHandler} localVars={localVars} />
          }
        />
        <Route path="/programmer" element={<ProgrammerReunion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
