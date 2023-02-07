import React, {useEffect, useState, useRef} from 'react'
import {useParams} from 'react-router-dom'
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
} from "../peerConSetup";

import {
  setHandleAnswer,
  setHandleIce,
  setHandleJoinRoom,
  setHandleOffer,
  setHandleUserJoined,
} from "../socketSetup";
import Video from './Video';
let userId;

export default function VideoRoum() {
    const roomId = useParams()
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
        socket.current.emit("video-room", { roomId: roomId, userId: 1 });
        userId = 1;
        setupUserId(1);
        if (localStream != null){
            localVideo.current.srcObject = localStream;
            console.log(localStream.current)
        }
        
        console.log(localVideo.current)
        
      }, []);
    
  return (
    <div>
    <video ref={localVideo} autoPlay/>
</div>
  )
}
