import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import Video from "./Video";
export default function Room() {
  const s = useRef(io.connect("localhost:8080"));
  const { roomid } = useParams();
  const [localStream, setLocalStream] = useState(null);
  const ref = useRef("");
  const [peers, setpeers] = useState([]);
  const [streams, setstreams] = useState([]);
  const flag = useRef(false);

  useEffect(() => {
    if (flag.current === false) {
      flag.current = true;

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setLocalStream(stream);
          ref.current.srcObject = stream;
        });
      s.current.emit("join", roomid);
      s.current.on("joined", ({ roomid, socketid }) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
        });
        peer.addStream(ref.current.srcObject);
        peer.on("stream", (stream) => {
          //setstreams([
          const vtab = document.querySelector("#video-tab");
          const vid = document.createElement("video");
          vid.srcObject = stream;
          vid.autoplay = true;
          vtab.appendChild(vid);
          streams.push({ stream: stream, id: socketid });
        });

        peer.on("signal", (signal) => {
          s.current.emit("offre", { signal, socketid });
        });
        //setpeers([...peers, ]);
        peers.push({ id: socketid, peer: peer });
      });
      s.current.on("offre", ({ signal, socketid }) => {
        console.log("jai recu une offre", socketid);
        let peer = new Peer({
          initiator: false,
          trickle: false,
        });
        peer.addStream(ref.current.srcObject);
        peers.push({ id: socketid, peer: peer });
        peer.on("signal", (signal) => {
          s.current.emit("answer", { signal, socketid });
          console.log("jai recu un signal", socketid);
        });
        peer.signal(signal);
        peer.on("stream", (stream) => {
          //setstreams([
          const vtab = document.querySelector("#video-tab");
          const vid = document.createElement("video");
          vid.srcObject = stream;
          vid.autoplay = true;
          vtab.appendChild(vid);
          setstreams([...streams, { stream: stream, id: socketid }]);
          //console.log(streams.stream);
        });
      });
      s.current.on("answer", ({ signal, socketid }) => {
        console.log("jai recu un answer", socketid);
        console.log(socketid, peers);
        let peer = peers.find((peer) => peer.id == socketid).peer;
        peer.signal(signal);
      });
    }
  }, []);

  function shareScreen() {
    var track = ref.current.srcObject
      .getTracks()
      .find((track) => track.kind === "video");
    console.log(track);
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((stream) => {
        peers.forEach((peer) => {
          const screenTrack = stream.getTracks()[0];

          peer.peer.removeTrack(track);
          peer.peer.addTrack(screenTrack);
        });
      });
  }

  const screenshare = () => {
    navigator.mediaDevices.getDisplayMedia({}).then((stream) => {
      let oldTrack = ref.current.srcObject
        .getTracks()
        .find((track) => track.kind == "video");
      console.log(stream);
      let screenTrack = stream
        .getTracks()
        .find((track) => track.kind == "video");
      peers.forEach((peer) => {
        peer.peer.addTrack(screenTrack, stream);
      });
    });
  };
  return (
    <>
      <div id="video-tab">
        <button onClick={screenshare}>:kjfhh</button>
        <video ref={ref} autoPlay />
      </div>
    </>
  );
}
