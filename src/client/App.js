import React, { useState, useRef, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home2/Home2";
import Contact from "./views/Contact";
import Chat from "./views/Chat";
import VideoRoom from "./views/VideoRoom";
import Profile from "./component/Profile/Profile";
import ProgrammerReunion from "./component/formulaire/modalForms/ProgramerLaReunion";
import "bootstrap/dist/css/bootstrap.min.css";

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
  let localVars = {
    user,
    convs,
  };
  useEffect(() => {
    let socket = socketIOClient("http://127.0.0.1:8080");
    localVars.socket = socket;
  });
  console.log(user);

  const changeUser = (userId, userName) => {
    //console.log(userId, userName);
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
        {
          //<Route path="/Dashbord" element={<Dashbord />} />
          //<Route path="/Dash" element={<Dash />} />
        }
        <Route
          path="/VideoRoomUI"
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
