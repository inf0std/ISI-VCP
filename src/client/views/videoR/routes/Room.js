import { useContext, useRef, useState, useEffect } from "react"
import { RoomContext } from "./RoomContext"
import {Video} from "./Video"
import Navbar from "../component/Navbar"
import './Room.css'
export default function Room() {
  const {videoStream, peers} = useContext(RoomContext)
  const VideoRef = useRef() 
  useEffect(()=>{
    if (videoStream !=null){
      if (VideoRef.current) VideoRef.current.srcObject = videoStream;
}},[videoStream])

  return (
    <div className="container1 bg-secondary" style={{ height: "650px" }}>
      <Navbar />
      <div className="container-sm flex flex-col bg-black"
        style={{ width: "830px" }}>
      <video className= ''ref={VideoRef} autoPlay />
      {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
    </div>
    </div>
  )
}
