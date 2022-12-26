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
<<<<<<< HEAD
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
=======
    <div className="col-sm-8 -bg-light cd-inline-block h-100 overflow-auto">
      <div className="row">
        <NavBar />
>>>>>>> dca0f6e0c693f5deb0e46c4e1ef8d732a5e536a1
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
          <input className="form-control mx-2" type="text" style={{}}></input>
          <button className="btn btn-success btn-rounded col-1" onClick={sendMessage}style={{}}>send</button>
      </form>
    </div>
    </div>
  );
};

export default ConversationTab;
