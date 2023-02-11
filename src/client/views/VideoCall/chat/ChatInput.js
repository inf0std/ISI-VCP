import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import s from "../Socket";
export default function () {
  const [message, setMessage] = useState();
  const roomid = useParams();
  const sendMessage = (msg) => {
    const messageData = {
      content: msg,
      timestamp: new Date().getTime(),
      author: s.id,
    };
    s.emit("send-message", roomid, messageData);
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(message);
          setMessage("");
        }}
        className="formular"
      >
        <div>
          <div className="flex">
            <textarea
              className=" border rounded-3  "
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button type="submit">
              <RiSendPlaneFill color="blue" size="2rem" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
