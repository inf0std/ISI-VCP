import React from "react";
import { useRef } from "react";
import { useState } from "react";
import io from "socket.io-client";
let socket = io.connect("http://localhost:8080");

//rtcPeerConnecion establishement
const constraints = (window.constraints = {
  audio: false,
  video: true,
});

let videoMemebers = [];
let localStream;

const getLocalStream = async () => {
  return navigator.mediaDevices.getUserMedia(constraints);
};

const createPeer = () => {
  return new RTCPeerConnection();
};

//let peer = new RTCPeerConnection();
const App2 = () => {
  const localVideo = useRef();
  socket.on("user-joined-video", (data) => {
    console.log("userJoined", data);
  });
  socket.on("video-room", (data) => {
    videoMemebers = data.members.map((user) => {
      return {
        id: user.id,
        socketId: user.socketId,
        peer: createPeer(),
      };
    });
    video;
    console.log("video-room joining", data);
    getLocalStream()
      .then((stream) => {
        window.stream = localStream = stream;
        localVideo.current.srcObject = stream;
      })
      .catch((err) => {
        console.log(err);
      });
  });
  socket.on("offer", ({ senderId, receiverId, offer }) => {});
  socket.on("answer", ({ senderId, receiverId }) => {});
  /* 
  const [user, setUser] = useState({ id: null, username: null, email: null });
  const [convs, setConvs] = useState([]); */

  return (
    <>
      <button
        onClick={() => {
          socket.emit("video-room", { roomId: 1, userId: 1 });
        }}
      >
        user 1 join room 1
      </button>
      <button
        onClick={() => {
          socket.emit("video-room", { roomId: 1, userId: 2 });
        }}
      >
        user 2 join room 1
      </button>
      <video id="localvideo" ref={localVideo} autoPlay></video>
    </>
  );
};

export default App2;
