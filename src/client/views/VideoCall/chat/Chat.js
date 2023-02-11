import React, { useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import s from "../Socket";
import "./chat.css";

export default function Chat({ chat }) {
  const flag = useRef(false);
  useEffect(() => {
    s.on("add-message", ({ message }) => {
      console.log(message);
    });
  }, []);
  return (
    <div className="chat_height">
      <div className="w-64 flex flex-col h-full justify ">
        <div></div>

        <ChatInput />
      </div>
    </div>
  );
}
