import React, { useEffect, useRef, useState } from "react";

const ChatUI = ({generalHandler, localVars}) => {
  const msgRef = useRef()
  const [messages, setMessages] = useState([]);
  const [convId, setConvId] = useState(1)

  useEffect(()=>{
    localVars.socket.on('msg', ({cid, content})=>{
      setMessages([...messages, content])
    })
  })
  const handleSubmit = event => {
    event.preventDefault();
    setMessages([...messages, message]);
    setMessage("");
    localVars.socket.emit('msg', {cid: convId,content: msgRef.current.value})
    msgRef.current.value=''
  };

  return (
    <div>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>{m}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          ref={msgRef}
          type="text"
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>Send</button>
      </form>
    </div>
  );
};

export default ChatUI;
