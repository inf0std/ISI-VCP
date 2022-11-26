import React, { useContext, useEffect} from 'react'
import { useParams  } from 'react-router-dom'
import {v4 as uuidV4} from 'uuid'
import  Navber  from '../components/Navber'
import { RoomContext } from '../context/RoomContext'
import {VideoPlayer} from '../components/VideoPlayer'
import '../app.css'
import Chat from '../components/chat/Chat'
export default function Room() {
  const {id} = useParams()
  const {ws,me,stream,peers,screenShId,setRoomId,chat}= useContext(RoomContext)

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
    <div className='flex flex-col min-h-screen' >
      <Navber/>
        <div className="flex grow">
                {screenSharingVideo && (
                    <div className="w-4/5 pr-4">
                        <VideoPlayer  stream={screenSharingVideo}/> 
                    </div>
                )}
        
        <div className={`grid gap-3  ${screenSharingVideo ? "w-1/5 grid-col-1": "grid-cols-3"} `}>

                    { screenShId !== me?.id && (
                      
                    <VideoPlayer  stream={stream}/>
                    )}

                {Object.values(peersToShow).map((peer)=>(
      
           <VideoPlayer key={uuidV4()} stream={peer.stream}/>
     
      ))} 
      
      </div>
      {chat.isChatOpen && (
      <div className='border-l-2'>
        <Chat/>
      </div>
      )}
        </div>
       
      
    </div>
   
  )
}
