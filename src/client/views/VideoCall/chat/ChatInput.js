import React, { useState, useRef } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
//import s from "../Socket";
export default function ({ s, name, send_msg }) {
  const { roomid } = useParams();
  const inputRef = useRef();

  const sendMessage = (msg) => {
    send_msg.send_msg(msg);
    /* const messageData = {
      name: name,
      content: msg,
      timestamp: new Date().getTime(),
      author: s.id,
    };
    s.emit("send-message", roomid, messageData); */
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(inputRef.current.value);
          inputRef.current.value = "";
        }}
        className="formular"
      >
        <div>
          <div className="flex">
            <textarea className=" border rounded-3" ref={inputRef} />
            <button type="submit">
              <RiSendPlaneFill color="blue" size="2rem" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
