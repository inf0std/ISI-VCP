import React, { useContext, useRef } from "react";

export default function ChatBubble({ message }) {
  const isSelf = useRef();

  return (
    <div>
      <div
        className={
          isSelf ? "m-1 flex pl-10 justify-end" : "m-1 flex pr-10 justify-start"
        }
      >
        <div
          className={
            isSelf
              ? "inline-block py-2 px-4 rounded bg-blue-400 "
              : "inline-block py-2 px-4 rounded bg-blue-600"
          }
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}
