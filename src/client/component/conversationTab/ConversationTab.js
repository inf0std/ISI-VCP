import React from "react";
import MessagesTab from "../messagesTab/MessagesTab";
import NavBar from "../navbar/NavBar";
import {useRef} from "react";

const ConversationTab = (props) => {
  const msgInput =useRef()
  const sendMessage = (e) => {
    e.preventDefault();
    props.socket.emit("msg",{
      conetent: msgInput.value

      

    })
  };

  return (
    <div className="col-md-9 -bg-light cd-inline-block">
      <NavBar />
      <MessagesTab myId={props.myId} msgs={props.msgs} />
        <div>
          <form
          className="d-flex py-3"
          style={{
            position: "absolute",
            bottom: 0,
            width: "72vw"
          }}
          >
            <input  ref={msgInput} className="form-control" type="text" style={{marginRight:'5px'}}></input>
            <button className="btn btn-success btn-rounded" onClick={sendMessage}style={{marginLeft:'2px'}}>send</button>
        </form>
      </div>
    </div>
  );
};

export default ConversationTab;
