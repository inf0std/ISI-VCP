
// import NavBar from '../component/navbar/NavBar'

import React, { useEffect, useRef, useState } from "react";

const ChatUI = ({generalHandler, localVars}) => {
  const msgRef = useRef()
  const [messages, setMessages] = useState([]);
  const [convId, setConvId] = useState(1)

  useEffect(()=>{
    localVars.socket.emit('user-room', {userId: 1})
    localVars.socket.on('msg', ({cid, message})=>{
      setMessages([...messages, message])
    })
  })
  const handleSubmit = event => {
    event.preventDefault();
    localVars.socket.emit('msg', {cid: 1,
      message:{
        content: msgRef.current.value,
         uid: localVars.user.id
        }
      })
    msgRef.current.value=''
  };

  return (
    <div>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>{m.uid +' '+m.content}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          ref={msgRef}
          type="text"
        />
        <button type="submit" onClick={handleSubmit}>Send</button>
      </form>
    </div>
  );
};

export default ChatUI;
