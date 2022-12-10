import React, { useContext, useEffect} from 'react'
import { useParams  } from 'react-router-dom'
import {v4 as uuidV4} from 'uuid'
import  Navbar  from '../components/navbar/Navbar'
import { RoomContext } from '../context/RoomContext'
import {VideoPlayer} from '../components/VideoPlayer'
import './Room.css'
import Chat from '../components/chat/Chat'
import Users from '../components/users/Users'
import classNames from 'classnames'
export default function Room() {
  const {id} = useParams()
  const {ws,me,stream,peers,screenShId,setRoomId,chat,user,nbr_partic}= useContext(RoomContext)
  
  useEffect(()=>{
    if (me)  ws.emit("join-room",({roomId: id ,peerId: me._id}))
  },[me,id,ws])

  useEffect(()=>{
    setRoomId(id)
  },[id,setRoomId])

  //console.log({screenShId})
  const screenSharingVideo = 
  screenShId === me?.id? stream: peers[screenShId]?.stream
  const { [screenShId]: sharing, ...peersToShow } = peers;
  return (
    <div className='container1 flex flex-col min-h-screen'>
      <Navbar/>
      {user && <Users />}
      
        <div className="flex grow">
                {screenSharingVideo && (
                    <div className="partage">
                        <VideoPlayer  stream={screenSharingVideo}/> 
                        
                    </div>
                )}
        <div className={`${screenSharingVideo ? "apres_partage":`${classNames({"video":nbr_partic === 1},
                                                                                  {"grid gap-2 grid-cols-2":nbr_partic === 2},
                                                                                  {"video2":nbr_partic >= 3},
                                                                                  {"grid gap-3 grid-cols-3":nbr_partic >=5},
                                                                                  {"grid gap-4 grid-cols-4":nbr_partic >=7})}`}`} >
        

                    { screenShId !== me?.id && (
                      
                    <VideoPlayer  stream={stream}/>
                    )}

                
                {Object.values(peersToShow).map((peer)=>(
                
           peer.stream !=null && <VideoPlayer key={uuidV4()} stream={peer.stream}/>
                  
           
      ))} 
       </div>
       </div>
     
      
      {chat.isChatOpen && (
      <div className='chat'>
        <Chat/>
      </div>
      )}
        </div>
       
        
    
  )
}
