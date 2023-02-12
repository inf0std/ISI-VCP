import React, { useEffect, useState, useRef, Children } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { TbScreenShare } from "react-icons/tb";
import s from "./Socket";
import {
  BsCameraVideoOff,
  BsCameraVideo,
  BsChatLeftText,
} from "react-icons/bs";
import { BiMicrophoneOff, BiMicrophone } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import Peer from "simple-peer";
import "./videocall.css";
import "./chat/chat.css";
import Chat from "./chat/Chat";
import ChatBubble from "./chat/ChatBubble";

export default function Room() {
  const s = useRef(io.connect("localhost:8080"));
  const { roomid, uid } = useParams();
  const localStream = useRef(null);
  const ref = useRef("");
  const [peers, setpeers] = useState([]);
  const [streams, setstreams] = useState([]);
  const flag = useRef(false);
  const [nbv, setnbv] = useState(1);
  useEffect(() => {
    if (flag.current === false) {
      flag.current = true;

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          console.log("recuperer stream avec succes", stream);
          localStream.current = stream;
          ref.current.srcObject = localStream.current;
          s.current.emit("join", { roomid, uid });
        });

      s.current.on("joined", ({ roomid, socketid }) => {
        console.log("userJoined", socketid);
        const peer = new Peer({
          initiator: true,
          trickle: false,
        });
        console.log("the stream to add ", ref.current.srcObject);
        peer.addStream(localStream.current);
        peer.on("stream", (stream) => {
          //setstreams([
          console.log("received stream", stream);
          addVideo(stream, socketid, false);
          streams.push({ stream: stream, id: socketid });
        });

        peer.on("signal", (signal) => {
          console.log("sending offer");
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
        console.log("stream to be added", ref.current.srcObject, localStream);
        peer.addStream(localStream.current);
        peers.push({ id: socketid, peer: peer });
        peer.on("signal", (signal) => {
          s.current.emit("answer", { signal, socketid });
          console.log("j'envoie une reponse", socketid);
        });
        peer.signal(signal);
        peer.on("stream", (stream) => {
          //setstreams([
          console.log("j'ai recu un stream", stream);
          addVideo(stream, socketid, false);
          setstreams([...streams, { stream: stream, id: socketid }]);
          //console.log(streams.stream);
        });
      });

      const classChoice = (nb) => {
        if (nb < 2) return "vid1";
        if (nb < 5) return "vid2";
        if (nb < 10) return "vid3";
      };
      const addVideo = (stream, id, screen) => {
        let oldc = classChoice(nbv);
        let newc = classChoice(nbv + 1);
        if (oldc !== newc) {
          changeVideoClass(newc, oldc);
          oldc = newc;
        }
        const vtab = document.querySelector("#video-tab");
        const vid = document.createElement("video");
        vid.srcObject = stream;
        vid.autoplay = true;
        vid.id = id;
        vid.classList.add(oldc);
        vtab.appendChild(vid);
        setnbv(nbv + 1);
        console.log(vtab.children);
      };

      const changeVideoClass = (newClass, oldClass) => {
        const vtab = document.querySelector("#video-tab");
        Object.values(vtab.children).forEach((v) => {
          v.classList.remove(oldClass);
          v.classList.add(newClass);
        });
      };
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
        .find((track) => track.kind === "video");
      console.log(stream);
      let screenTrack = stream
        .getTracks()
        .find((track) => track.kind === "video");
      peers.forEach((peer) => {
        peer.peer.addTrack(screenTrack, stream);
      });
    });
  };
  return (
    <div className="container1 bg-black" style={{ height: window.innerHeight }}>
      <div id="video-space">
        <div id="video-tab" className="container_video flex flex-col">
          <video className="vid1" ref={ref} autoPlay />
        </div>
        <div className="ligne1">
          <div className="menu">
            <div className="item">
              <span className="icon">
                <HiUsers size=" 23px" />
              </span>
              <span>Participants</span>
            </div>

            <div className="item">
              <span className="icon">
                <BsCameraVideo size=" 23px" />
              </span>
              <span>Camera</span>
            </div>
            <div className="item">
              <span className="icon">
                <BiMicrophoneOff size=" 23.5px" />
              </span>
              <span>Audio</span>
            </div>
            <div className="item" onClick={screenshare}>
              <span className="icon">
                <TbScreenShare size=" 23px" />
              </span>
              <span>Share-Screen</span>
            </div>
            <div className="item">
              <span className="icon">
                <BsChatLeftText size=" 21.5px" />
              </span>
              <span>Chat</span>
            </div>
          </div>
        </div>
      </div>
      <div className="chat">
        <Chat />
      </div>
    </div>
  );
}
