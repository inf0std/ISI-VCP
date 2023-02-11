import React, { useRef, useState, useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
//import s from "../Socket";
import "./chat.css";

const Chat = ({ s, name }) => {
  const { roomid } = useParams();
  const flag = useRef(false);
  const [msgList, setMsgList] = useState([]);
  useEffect(() => {
    if (!flag) {
      flag = true;
      s.on("msg", ({ message }) => {
        msgList.push(message);
        setMsgList(msgList);
        console.log("received", message);
        console.log(msgList);
      });
      s.on("msgs", ({ msgs }) => {
        msgList.concat(msgs);
        setMsgList(msgList);
        console.log("received", msgList);
      });
    }
  }, [msgList]);
  return (
    <div className="chat_height">
      <div className="w-64 flex flex-col h-full justify ">
        <div>
          {msgList.map((msg) => {
            return (
              <>
                <p>{msg.name}</p>
                <p>{msg.content}</p>
              </>
            );
          })}
        </div>

        <ChatInput s={s} name={name} />
      </div>
    </div>
  );
};

export default Chat;
