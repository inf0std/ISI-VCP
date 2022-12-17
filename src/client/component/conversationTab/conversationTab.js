import React from "react";
import MessagesTab from "../messagesTab/MessagesTab";
const ConversationTab = (props) => {
  const sendMessage = (event) => {
    event.preventDefault();
  };

  return (
    <div className="col-md-9">
      <MessagesTab myId={props.myId} msgs={props.msgs} />
      <form
        className=""
        style={{
          width: "auto",
        }}
      >
        <input type="text"></input>
        <button onClick={sendMessage}>send</button>
      </form>
    </div>
  );
};

export default ConversationTab;
