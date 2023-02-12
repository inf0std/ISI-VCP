import React, { useEffect, useState, useRef, Children } from "react";
import io from "socket.io-client";
import config from "../../config.json";
import { useParams } from "react-router-dom";
import { TbScreenShare } from "react-icons/tb";
import { RiSendPlaneFill } from "react-icons/ri";
import {
  BsCameraVideoOff,
  BsCameraVideo,
  BsChatLeftText,
} from "react-icons/bs";
import { BiMicrophoneOff, BiMicrophone } from "react-icons/bi";
import { HiUsers, HiOutlinePhoneMissedCall } from "react-icons/hi";
import Peer from "simple-peer";
import "./videocall.css";
import "./chat/chat.css";
import { useNavigate } from "react-router-dom";

const mediaConstraint = {

}
const peerConfig = {
  iceServers: [
    {
      urls: "stun:relay.metered.ca:80",
    },
    {
      urls: "turn:relay.metered.ca:80",
      username: "aab6710f1446c8a22c6f85ab",
      credential: "oT7ojrV4R69DAF1o",
    },
    {
      urls: "turn:relay.metered.ca:443",
      username: "aab6710f1446c8a22c6f85ab",
      credential: "oT7ojrV4R69DAF1o",
    },
    {
      urls: "turn:relay.metered.ca:443?transport=tcp",
      username: "aab6710f1446c8a22c6f85ab",
      credential: "oT7ojrV4R69DAF1o",
    },
  ],
}
export default function Room() {
  const s = useRef(io(config.io_url));
  const Navigate = useNavigate();
  const inputRef = useRef();
  const isSelf = useRef();
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
        .getUserMedia({ video: {width: {exact: 100}, height: {exact: 80}}, audio: true })
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
          config: peerConfig
        });
        peer.on("data", (data) => {
          let message = JSON.parse(data.toString());
          addmessage(message);
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
          config: peerConfig,
        });
        console.log("stream to be added", ref.current.srcObject, localStream);
        peer.addStream(localStream.current);
        peers.push({ id: socketid, peer: peer });
        peer.on("data", (data) => {
          let message = JSON.parse(data.toString());
          addmessage(message);
        });
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
        if (nb < 10) return "vid5";
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
      s.current.on("end", ({ sid }) => {
        console.log("recived end event");
        const vid = document.getElementById(sid);
        vid.remove();
        let index = peers.findIndex((peer) => peer.id == sid);
        peers[index].peer.destroy();
        peers.splice(index, 1);
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

  const addmessage = (message) => {
    console.log("me", s.current.id);

    console.log("author", message.author);
    let self = message.author === s.current.id;
    const msg_element = document.querySelector("#msg");
    const vid = document.createElement("p");
    const vidi = document.createElement("small");
    const pere = document.createElement("div");
    vid.innerHTML = message.content;
    vidi.innerHTML = message.name;
    pere.classList.add("pere");
    if (self) {
      vid.classList.add("message-user");
      vidi.classList.add("user");
    } else {
      vid.classList.add("message-other");
      vidi.classList.add("other");
    }
    pere.appendChild(vid);
    pere.appendChild(vidi);
    msg_element.appendChild(pere);
    msg_element.scrollTop = msg_element.scrollHeight;
  };
  const sendMessage = (msg) => {
    const messageData = {
      name: "ferhat",
      content: msg,
      timestamp: new Date().getTime(),
      author: s.current.id,
    };
    peers.forEach((peer) => {
      peer.peer.send(JSON.stringify(messageData));
    });
  };
  const end_call = () => {
    s.current.emit("end", { roomid, sid: s.current.id });
    Navigate("/profile/1");
  };
  const muted = () => {
    const tracks = localStream.current.getAudioTracks();
    tracks.forEach((track) => (track.muted = true));
  };
  return (
    <div className="container1 bg-black" style={{ height: window.innerHeight }}>
      <div id="video-space">
        <div id="video-tab" className="container_video flex flex-col">
          <video className="vid1" ref={ref} autoPlay />
        </div>

        <div className="chat">
          <div className="chat_height">
            <div className="w-64 flex flex-col h-full justify ">
              <div
                className={
                  isSelf
                    ? "m-1 flex pl-10 justify-end"
                    : "m-1 flex pr-10 justify-start"
                }
              >
                <div id="msg"></div>
              </div>
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(inputRef.current.value);
                    addmessage({
                      name: "ferhat",
                      content: inputRef.current.value,
                      timestamp: Date.now(),
                      author: s.current.id,
                    });
                    inputRef.current.value = "";
                  }}
                  className="formular"
                >
                  <div>
                    <div className="flex">
                      <textarea className=" border rounded-3" ref={inputRef} />
                      <button type="submit">
                        <RiSendPlaneFill color="blue" size="2rem" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
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
            <div className="item" onClick={muted}>
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
            <div className="item" onClick={end_call}>
              <span className="icon">
                <HiOutlinePhoneMissedCall size=" 21.5px" />
              </span>
              <span>end</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
