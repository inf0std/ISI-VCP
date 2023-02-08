import React, { useContext } from 'react'
import './navbar.css'
import { TbScreenShare } from 'react-icons/tb';
import { BsCameraVideoOff,BsCameraVideo, BsChatLeftText } from 'react-icons/bs';
import { BiMicrophoneOff,BiMicrophone } from 'react-icons/bi';
import { HiUsers } from 'react-icons/hi'
import { RoomContext } from '../routes/RoomContext';

export default function Navbar() {
  const {shareScreen} = useContext(RoomContext)

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
            <span className='icon'> <BiMicrophoneOff size=" 23.5px" /> </span>
            <span>Audio</span>
            </div><div className='item' onClick={shareScreen} >
            <span className='icon'><TbScreenShare size=" 23px"  /></span>
            <span>Share-Screen</span>
            </div>
            <div className='item' >
            <span className='icon'><BsChatLeftText  size=" 21.5px" /></span>
            <span>Chat</span>
            </div>
 
        </div>
        
    </div>
    
   
   
  
  )
}

