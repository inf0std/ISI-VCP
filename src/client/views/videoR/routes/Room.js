import { useContext, useRef, useState, useEffect } from "react"
import { RoomContext } from "./RoomContext"
import {Video} from "./Video"
import Navbar from "../component/Navbar"
import './Room.css'
export default function Room() {
  const {stream, peers} = useContext(RoomContext)
  const VideoRef = useRef() 
  useEffect(()=>{
    if (stream !=null){
      if (VideoRef.current) VideoRef.current.srcObject = stream;
}},[stream])

  return (
    <div className="">
      <Navbar />
      <div className="">
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
