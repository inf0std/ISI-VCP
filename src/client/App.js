
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "./App.css";
import Chat from "./views/Chat";
  
//const socket =io("http://localhost:4000");
const convs = [
  {
    name: "conv-1",
    msgs: [
      {
        senderId: 1,
        content: "hello",
      },
      {
        senderId: 2,
        content: "hello there",
      },
      {
        senderId: 1,
        content: "how are you doing",
        seen: true,
      },
    ],
  },
  {
    name: "conv-2",
    msgs: [
      {
        senderId: 1,
        content: "hello",
      },
      {
        senderId: 2,
        content: "hello there",
      },
      {
        senderId: 1,
        content: "how are you doing",
      },
      {
        senderId: 1,
        content: "fine, how about you",
        seen: false,
      },
    ],
  },
];
function App() {
  const socket = useRef(io())
  const [convList , setConvLIst] = useState([
    {
      name: "conv-1",
      msgs: [
        {
          senderId: 1,
          content: "hello",
        },
        {
          senderId: 2,
          content: "hello there",
        },
        {
          senderId: 1,
          content: "how are you doing",
          seen: true,
        },
      ],
    },
    {
      name: "conv-2",
      msgs: [
        {
          senderId: 1,
          content: "hello",
        },
        {
          senderId: 2,
          content: "hello there",
        },
        {
          senderId: 1,
          content: "how are you doing",
        },
        {
          senderId: 1,
          content: "fine, how about you",
          seen: false,
        },
      ],
    },
  ])
  useEffect(()=>{
    //recuperer les conversation
    //declrer socket
    const socket =io("http://localhost:4000");
  
    socket.on("msg", data=>{
      let msg = data.msg;
      let index = convList.findIndex((conv)=>{
        return conv.id === data.convId
      })
      if (index === -1){
        convList.push({
          id : data.convId,
          name : data.convId,
          msgs : []
        })
      }
      setConvLIst(convList[index].msgs.push(msg))
    })
  })
  return (
    <>
      <Chat  socket={socket} convs={convList} />
    </>
  );
}

export default App;
