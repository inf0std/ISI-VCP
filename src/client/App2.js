import React from "react";
import { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import {
  addUser,
  addUserBatch,
  setupUserId,
  setupSocket,
  setupLocalStream,
  setupStreams,
  handleAnswer,
  handleIce,
  handleOffer,
  handleLeaveEvent,
} from "./peerConSetup";

import {
  setHandleAnswer,
  setHandleIce,
  setHandleJoinRoom,
  setHandleOffer,
  setHandleUserJoined,
} from "./socketSetup";
let userId;

//rtcPeerConnecion establishement
const constraints = (window.constraints = {
  audio: false,
  video: true,
});

let localStream;

const getLocalStream = async () => {
  return navigator.mediaDevices.getUserMedia(constraints);
};

const createPeer = () => {
  return new RTCPeerConnection();
};
getLocalStream()
  .then((stream) => {
    window.stream = localStream = stream;
    setupLocalStream(stream);
    //localVideo.current.srcObject = stream;
  })
  .catch((err) => {
    console.log(err);
  });
//let peer = new RTCPeerConnection();
const App2 = () => {
  const [streams, setStreams] = useState([]);
  const socket = useRef(null);
  const localVideo = useRef();
  useEffect(() => {
    socket.current = io.connect("http://localhost:8080");
    setupSocket(socket.current);
    setupStreams(streams, setStreams);
    setupUserId(userId);
    setupLocalStream(localStream);
    setHandleAnswer(socket.current);
    setHandleIce(socket.current);
    setHandleOffer(socket.current);
    setHandleJoinRoom(socket.current, userId);
    setHandleUserJoined(socket.current);
  }, []);

  /* 
  const [user, setUser] = useState({ id: null, username: null, email: null });
  const [convs, setConvs] = useState([]); */

  return (
    <>
      <button
        onClick={() => {
          socket.current.emit("video-room", { roomId: 1, userId: 1 });
          userId = 1;
          setupUserId(1);
          localVideo.current.srcObject = localStream;
        }}
      >
        user 1 join room 1
      </button>
      <button
        onClick={() => {
          socket.current.emit("video-room", { roomId: 1, userId: 2 });
          userId = 2;
          setupUserId(2);
          localVideo.current.srcObject = localStream;
        }}
      >
        user 2 join room 1
      </button>
      <button
        onClick={() => {
          socket.current.emit("video-room", { roomId: 1, userId: 3 });
          userId = 3;
          setupUserId(3);
          localVideo.current.srcObject = localStream;
        }}
      >
        user 3 join room 1
      </button>
      <video id="localvideo" ref={localVideo} autoPlay></video>
      <p>{streams.join("<br></br>")}</p>
    </>
  );
};

export default App2;
