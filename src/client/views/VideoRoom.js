import React, {useState} from 'react'
import { useParams  } from 'react-router-dom'
import {v4 as uuidV4} from 'uuid'
import  Navbar  from './VideoRoom/components/navbar/Navbar'
import {VideoPlayer} from './VideoRoom/components/VideoPlayer'
import './VideoRoom/Room.css'
import Chat from './VideoRoom/components/chat/Chat'
import Users from './VideoRoom/components/users/Users'
export default function Room() {
  const {id} = useParams()
 // const {ws,me,stream,peers,screenShId,setRoomId,chat,user}= useContext(RoomContext)
 
  const [user, setUser]= useState(false)
  const [stream, setStream]=useState(null)
  
  
  //console.log({screenShId})
  const peersToShow = {}
  return (
    <div className='container1 flex flex-col min-h-screen'>
      <Navbar/>
      {user && <Users />}
      
        <div className="flex grow">
                
        <div className="container_video" >
        
                
               <VideoPlayer  stream={stream}/>
                  
          
       </div>
       </div>
     
        </div>
       
        
    
  )
}
