import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
export default function Room() {
  const s = useRef(io.connect("localhost:8080"));
  const { roomid } = useParams();
  const [localStream, setLocalStream] = useState();
  const [peers, setpeers] = useState([]);
  const flag = useRef(false);

  useEffect(() => {
    if (flag.current === false) {
      flag.current = true;

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => setLocalStream(stream));
      s.current.emit("join", roomid);
      s.current.on("joined", ({ roomid, socketid }) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          localStream,
        });
        peer.on("signal", (signal) => {
          s.current.emit("offre", { signal, socketid });
        });
        setpeers(...peers, { socketid, peer });
      });
      s.current.on("offre", ({ signal, socketid }) => {
        console.log("jai recu une offre", socketid);
        let peer = new Peer({
          initiator: false,
          trickle: false,
          localStream,
        });
        peer.on("signal", (signal) => {
          s.current.emit("answer", { signal, socketid });
          console.log("jai recu un signal", socketid);
        });
        peer.signal(signal);
      });
      s.current.on("answer", ({ signal, socketid }) => {
        console.log("jai recu un answer", socketid);
        let peer = peers.find((peer) => peer.socketid == socketid).peer;
        peer.signal(signal);
      });
    }
  }, []);
  return <div>Room</div>;
}
