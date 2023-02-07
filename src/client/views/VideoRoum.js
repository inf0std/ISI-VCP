import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

import Room from "../Room";
import Video from "./Video";

export default function VideoRoum({ generalHandler, localVars }) {
  const { roomid, userid } = useParams();
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

  useEffect(() => {
    getLocalStream()
      .then((stream) => {
        //setupLocalStream(stream);
        setLocalStream(stream);
        //localVideo.current.srcObject = stream;
      })
      .catch((err) => {
        console.log(err);
      });
    const { socket, user } = localVars;
    let room = new Room(
      socket,
      user.id,
      roomid,
      localStream,
      setStreams,
      streams
    );
    room.connect();
  }, []);
  console.log("nbstreams", streams.length);
  //localVideo.current.srcObject = localStream;
  return (
    <div>
      <Video stream={{ stream: localStream, id: userid }}></Video>
      {streams.map((s) => {
        console.log("stream", s);
        console.log("nb stream", streams.length);
        return <Video stream={s}></Video>;
      })}
    </div>
  );
}
