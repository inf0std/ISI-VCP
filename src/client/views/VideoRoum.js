import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
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
  const localVideo = useRef();
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
  }, []);
  //localVideo.current.srcObject = localStream;
  return (
    <div>
      <Video stream={localStream}></Video>
      {streams.map((s) => {
        console.log("stream", s);
        return <Video stream={s}></Video>;
      })}
    </div>
  );
}
