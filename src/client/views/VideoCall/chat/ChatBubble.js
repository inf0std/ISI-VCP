import React, { useContext, useRef } from "react";
import s from "../Socket";
import "./chat.css";

export default function ChatBubble({ message }) {
  const isSelf = message.author === s.id;
  return (
    <div
      className=""
      style={{ width: "400px", height: "450px", backgroundColor: "white" }}
    >
      <div>
        <div>{message.content}</div>
      </div>
    </div>
  );
}
