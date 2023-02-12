import React, { useRef, useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
//import s from "../Socket";
import "./chat.css";

export default function Chat() {
  const flag = useRef(false);
  const isSelf = useRef();

  useEffect(() => {
    if (flag.current == false) {
      flag.current = true;
      s.on("add-message", (message) => {
        isSelf.current = message.author === s.id;
        const msg_element = document.querySelector("#msg");
        const vid = document.createElement("p");
        const vidi = document.createElement("small");
        const pere = document.createElement("div");
        vid.innerHTML = message.content;
        vidi.innerHTML = "ferhat";
        pere.classList.add("pere");
        if (isSelf) {
          vid.classList.add("message-user");
          vidi.classList.add("user");
        } else {
          vid.classList.add("message-other");
          vidi.classList.add("other");
        }
        pere.appendChild(vid);
        pere.appendChild(vidi);
        msg_element.appendChild(pere);
      });
    }
  }, []);
  return (
    <div className="chat_height">
      <div className="w-64 flex flex-col h-full justify ">
        <div
          className={
            isSelf
              ? "m-1 flex pl-10 justify-end"
              : "m-1 flex pr-10 justify-start"
          }
        >
          <div id="msg"></div>
        </div>
        <ChatInput />
      </div>
    </div>
  );
}
