import React from "react";
import MessagesTab from "../messagesTab/MessagesTab";
import NavBar from "../navbar/NavBar";

const ConversationTab = (props) => {
  const sendMessage = (event) => {
    event.preventDefault();
  };

  return (
    <div className="col-sm-8 -bg-light cd-inline-block">
      <NavBar />
      <MessagesTab myId={props.myId} msgs={props.msgs} />
        <div>
          <form
          className="d-flex py-3 bg-light"
          style={{
            position: "fixed",
            bottom: 0,
            width: "65vw"
          }}
          >
            <input className="form-control" type="text" style={{marginRight:'5px'}}></input>
            <button className="btn btn-success btn-rounded" onClick={sendMessage}style={{marginLeft:'2px'}}>send</button>
        </form>
      </div>
    </div>
  );
};

export default ConversationTab;
