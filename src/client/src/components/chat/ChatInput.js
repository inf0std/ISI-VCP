import React, { useContext, useState } from 'react'
import '../../app.css'
import { RoomContext } from '../../context/RoomContext'
export default function () {
    const [message, setMessage] = useState()
    const {sendMessage}= useContext(RoomContext)
  return (
    <div >
        <form onSubmit={(e)=>{
          e.preventDefault();
          sendMessage(message);
          setMessage("")
        }} className='btn ' >
            <div>
            <div  className='flex'>
           < textarea 
            className=' border rounded'
            onChange = {e => setMessage(e.target.value)}
            value={message}/>
           
            <button type='submit' className='bg-rose-400 mx-1 rounded-lg text-xl px-1 hover:bg-rose-600 text-white'>send</button>
            </div>
            </div>
            
        </form>
    </div>
  )
}
