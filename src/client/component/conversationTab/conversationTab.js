import React from "react";
import MessagesTab from "../messagesTab/MessagesTab";
import NavBar from "../navbar/NavBar";

const ConversationTab = (props) => {
  const sendMessage = (event) => {
    event.preventDefault();
  };

  return (
    <div className="col-sm-8 -bg-light cd-inline-block h-100 overflow-auto">
      <div className="row">
        <NavBar />
      </div>
      <div className="row h-100">
        <MessagesTab myId={props.myId} msgs={props.msgs} />
      </div>
      <div className="row d-flex justify-content-end aligh-self-end">
        <form
          className="d-flex py-3 bg-light col-7 mx-3"
          style={{
            position: "fixed",
            bottom: 0,
            // width: "65vw"
          }}
        >
          <input className="form-control mx-2" type="text"></input>
          <button
            className="btn btn-success btn-rounded col-1"
            onClick={sendMessage}
          >
            send
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default ConversationTab;
