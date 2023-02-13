import config from "./config.json";
import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home2/Home2";
import Contact from "./views/Contact";
//import Chat from "./views/Chat";
import { getData } from "./utils/dataFetcherUtils";
import Profile from "./views/Profile/Profile";
import Room from "./views/VideoCall/Room";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  //state declaration

  const [convs, setConvs] = useState([]);
  const [user, setUser] = useState({ id: null, name: null });
  //const socket = useRef(s);

  useEffect(() => {
    getData()
      .then((response) => response.json())
      .then((data) => {
        setUser({
          id: data._id,
          name: data.name,
          token: data.token,
          all: data,
        });
      });
  }, []);

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
        <Route path="/room/:roomid" element={<Room user={user} />} />
        <Route
          path="/Contact"
          element={<Contact user={user} changeUser={changeUser} />}
        />

        <Route
          path="/profile"
          element={<Profile user={user} changeUser={changeUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
