import React, { useContext, useEffect, useRef } from 'react'
import { RoomContext } from '../context/RoomContext'
import '../app.css'
export const VideoPlayer=({stream}) =>{
    const VideoRef = useRef()
    const {son} =useContext(RoomContext)
    useEffect(()=>{
      if (stream !=null){
        if (VideoRef.current) VideoRef.current.srcObject = stream;
}},[stream])
  return (
          <video  className='vid'  ref={VideoRef} autoPlay muted={son}></video>  
) 
}
