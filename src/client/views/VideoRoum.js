import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from './VideoRoom/components/navbar/Navbar'
import './videoroom.css'
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
import Video from "./Video";

export default function VideoRoum(props) {
  const { roomid, userid } = useParams();
  
  console.log(props);
  //rtcPeerConnecion establishement
  const constraints = (window.constraints = {
    audio: false,
    video: true,
  });

  const getLocalStream = async () => {
    return navigator.mediaDevices.getUserMedia(constraints);
  };

  //let peer = new RTCPeerConnection();
  const [streams, setStreams] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const [Nbr_Partipents, setNbr_Partipents] = useState()
  useEffect(() => {
    getLocalStream()
      .then((stream) => {
        setupLocalStream(stream);
        setLocalStream(stream);
        //localVideo.current.srcObject = stream;
      })
      .catch((err) => {
        console.log(err);
      });
    let s = props.localVars.socket;
    setupSocket(s);
    setupStreams(streams, setStreams);
    setupUserId(userid);
    setupLocalStream(localStream);
    setHandleAnswer(s);
    setHandleIce(s);
    setHandleOffer(s);
    setHandleJoinRoom(s, userid);
    setHandleUserJoined(s);
    s.emit("video-room", { roomId: roomid, userId: userid });
    setupUserId(userid);
    setNbr_Partipents(streams.length)
    setStreams([localStream,localStream,localStream,localStream])
  }, [Nbr_Partipents]);
  //localVideo.current.srcObject = localStream;
  return (
    <div className="container1 bg-secondary" style={{height : '650px'}}>
      <Navbar/>
      <div className="container-sm flex flex-col bg-black" style={{width : '830px'}}>
      <Video stream={localStream} Nbr_Partipents={Nbr_Partipents}></Video>
      {streams.map((s,index) => {
        console.log("stream", s);
        return <Video key={index} stream={s} Nbr_Partipents={Nbr_Partipents}></Video>;
      })}
      </div>
    </div>
  );
}
