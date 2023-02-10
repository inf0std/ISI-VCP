import { useContext, useRef, useState, useEffect } from "react";
import { RoomContext } from "./RoomContext";
import { Video } from "./Video";
import Navbar from "../component/Navbar";
//import { RoomContext } from "./RoomContext";
import "./Room.css";

export default function Room() {
  const { videostream, peers } = useContext(RoomContext);
  const VideoRef = useRef(this);
  useEffect(() => {
    console.log("stream", videostream);
    if (videostream != null) {
      VideoRef.current.srcObject = videostream;
    }
  }, []);

  return (
    <div className="container1 bg-secondary" style={{ height: "650px" }}>
      <Navbar />
      <div
        className="container-sm flex flex-col bg-black"
        style={{ width: "830px" }}
      >
        <video ref={VideoRef} autoPlay />
        {peers.map((peer, index) => {
          return <Video key={index} peer={peer} />;
        })}
      </div>
    </div>
  );
}
