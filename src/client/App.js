import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home2/Home2";
import Contact from "./views/Contact";
import Chat from "./views/Chat";
import VideoRoom from "./views/VideoRoum";
import Profile from "./component/Profile/Profile";
import ProgrammerReunion from "./component/formulaire/modalForms/ProgramerLaReunion";
import { getConversations } from "./utils/fetchUtils";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateRoom from './views/videoR/routes/CreateRoom'
import Room from './views/videoR/routes/Room'

//let s = io.connect("http://localhost:8080");
function App() {
  //state declaration
  
  const [convs, setConvs] = useState([]);
  const [user, setUser] = useState({ id: null, name: null });
  const socket = useRef();

  useEffect(() => {
    if (user.id) {
      socket.current.emit("joinRoom", { room: `user-${user.id}` });
      localVars.socket = socket.current;
      getConversations(user.id).then((convs) => setConvs(convs));
    } else setConvs([]);
  }, [user]);

  const changeUser = (userId, userName) => {
    setUser({ id: userId, name: userName });
  };

  let localVars = {
    user,
    convs,
    socket: socket.current,
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
          path="/VideoRoomUI/:roomid/:userid"
          element={
            <VideoRoom generalHandler={generalHandler} localVars={localVars} />
          }
        />
        <Route path="/createroom/room/:roomid"element={<Room />}/>
        
        <Route path="/createroom"element={<CreateRoom/>}/>
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
