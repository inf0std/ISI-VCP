import React, { useContext } from 'react'
import './navbar.css'
import { TbScreenShare } from 'react-icons/tb';
import { BsCameraVideoOff,BsCameraVideo, BsChatLeftText } from 'react-icons/bs';
import { BiMicrophoneOff,BiMicrophone } from 'react-icons/bi';
import { HiUsers } from 'react-icons/hi'
import { useState } from 'react';
//import { RoomContext } from '../../context/RoomContext';

export default function Navbar() {
  //const {screenShare,couperson,son,toggleChat,afficher_users} = useContext(RoomContext)
  const [son, setson] = useState(false)
  

  return (
    <div className="ligne1">
       
        <div className="menu">
          <div className='item' >
            <span className='icon'><HiUsers size=" 23px"  /></span>
            <span>Participants</span>
            </div>
            
            <div className='item'>
            <span className='icon'><BsCameraVideo size=" 23px" /></span>
            <span>Camera</span>
            </div>
            <div className='item'  >
            <span className='icon'>{son ? <BiMicrophoneOff size=" 23.5px" /> : <BiMicrophone size=" 23.5px" /> }</span>
            <span>Audio</span>
            </div><div className='item' >
            <span className='icon'><TbScreenShare size=" 23px"  /></span>
            <span>Partage d'écran</span>
            </div>
            <div className='item' >
            <span className='icon'><BsChatLeftText  size=" 21.5px" /></span>
            <span>Discuter</span>
            </div>
 
        </div>
        
    </div>
    
   
   
  
  )
}

