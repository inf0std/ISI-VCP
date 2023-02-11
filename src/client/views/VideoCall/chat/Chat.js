import React, { useContext } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import "./chat.css";

export default function Chat({ chat }) {
  return (
    <div className="chat_height">
      <div className="w-64 flex flex-col h-full justify ">
        <div></div>
        <ChatInput />
      </div>
    </div>
  );
}
