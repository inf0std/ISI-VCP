import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SimplePeer from "simple-peer";
import io from "socket.io-client";
let s = io.connect("http://localhost:8080");
const VideoChat = () => {
  const { uid, rid } = useParams();
  console.log(uid, rid);
  const [stream, setStream] = useState(null);
  const [peers, setPeers] = useState([]);
  const socket = useRef(s);
  const [id, setId] = useState(null);
  const [screenShare, setScreenShare] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const getMedia = screenShare
      ? navigator.mediaDevices.getDisplayMedia
      : navigator.mediaDevices.getUserMedia;

    getMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
    });
  }, []);
  useEffect(() => {
    //socket.current.emit("join", { rid, id: uid });
    socket.current.on("joined", ({ id, sid }) => {
      console.log(`user ${id} joined`);
      //const peer = setupPeer(id, sid, true);
    });
    socket.current.on("ids", ({ ids }) => {
      console.log(`all joined users `, ids);
      ids.forEach((u) => {
        let peer = setupPeer(u.id, u.sid, false);
      });
      console.log(peers);
    });
    socket.current.on("peer-disconnected", (id) => {
      const peerIndex = peers.findIndex((peer) => peer.id === id);
      if (peerIndex === -1) return;
      peers[peerIndex].peer.destroy();
      setPeers((prevPeers) =>
        prevPeers.filter((_, index) => index !== peerIndex)
      );
    });

    socket.current.on("offer", (offer) => {
      const p = setupPeer(false);
      p.peer.signal(offer.offer);
    });

    socket.current.on("answer", (answer) => {
      const peer = peers.find((peer) => peer.id === answer.id);
      if (!peer) return;
      peer.peer.signal(answer.answer);
    });
  }, [joined]);

  const setupPeer = (id, sid, init) => {
    const peer = new SimplePeer({
      initiator: init,
      stream,
    });

    peer.on("signal", (offer) => {
      socket.current.emit("offer", { id, sid, offer });
    });

    peer.on("stream", (remoteStream) => {
      const newPeers = [...peers];
      newPeers.push({ id, sid, peer, stream: remoteStream });
      setPeers(newPeers);
    });

    return { id, peer };
  };

  return (
    <div>
      <p>Your ID: {id}</p>

      <button onClick={() => setScreenShare(!screenShare)}>
        {screenShare ? "Stop Screen Share" : "Start Screen Share"}
      </button>
      <button
        onClick={(e) => {
          socket.current.emit("join", { rid, id: uid });
          e.target.disanled = true;
        }}
      >
        {" "}
        se connecter
      </button>
      {peers.map((peer) => (
        <video
          key={peer.id}
          autoPlay={true}
          src={URL.createObjectURL(peer.stream)}
        />
      ))}
    </div>
  );
};

export default VideoChat;
