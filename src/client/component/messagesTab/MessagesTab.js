import React from "react";
import Msg from "../msg/msg.js";

const MessagesTab = (props) => {
  return (
    <div className="h-75 d-inline-block">
      {console.log(props.msgs)}
      {props.msgs.map((m) => (
        <Msg msg={m} isme={m.senderId === props.myId} />
      ))}
    </div>
  );
};

export default MessagesTab;
