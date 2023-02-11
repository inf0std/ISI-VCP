import React, { useState, useRef } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
//import s from "../Socket";
export default function ({ s, name }) {
  const { roomid } = useParams();
  const inputRef = useRef();
  const sendMessage = (msg) => {
    const messageData = {
      name: name,
      content: msg,
      timestamp: new Date().getTime(),
      author: s.id,
    };
    console.log(messageData);
    console.log("roomid", roomid);
    s.emit("msg", { roomid, message: messageData });
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
