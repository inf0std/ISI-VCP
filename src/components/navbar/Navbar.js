import React, { useContext } from 'react'
import './navbar.css'
import { TbScreenShare } from 'react-icons/tb';
import { BsCameraVideoOff,BsCameraVideo, BsChatLeftText } from 'react-icons/bs';
import { BiMicrophoneOff,BiMicrophone } from 'react-icons/bi';
import { HiUsers } from 'react-icons/hi'
import { RoomContext } from '../../context/RoomContext';

export default function Navbar() {
  const {screenShare,couperson,son,toggleChat,afficher_users} = useContext(RoomContext)

  return (
    <div className="ligne1">
       <div className="users"> <HiUsers size=" 23px" onClick={afficher_users} /></div>
       
        <div className="menu">
            <ul>
                <li ><TbScreenShare size=" 23px" onClick={screenShare} /></li>
                <li ><BsCameraVideo size=" 23px" /></li>
                <li>{son ? <BiMicrophoneOff size=" 23.5px" onClick={couperson} /> : <BiMicrophone size=" 23.5px" onClick={couperson}/> }</li>
                <li><BsChatLeftText onClick={toggleChat} size=" 21.5px" /></li>
            </ul>
 
        </div>
    </div>
    
   
   
  
  )
}

