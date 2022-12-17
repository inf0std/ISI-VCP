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
          display: 'flex'
        }}
      >
        <input className="form-control" type="text" style={{marginRight:'5px'}}></input>
        <button className="btn btn-success btn-rounded float-end" onClick={sendMessage}style={{marginLeft:'2px'}}>send</button>
      </form>
    </div>
  );
};

export default ConversationTab;
