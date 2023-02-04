import { useState, useEffect } from "react";
// import NavBar from '../component/navbar/NavBar'
import Conversations from "../component/conversations/conversations";
import ConversationTab from "../component/conversationTab/conversationTab";
const Chat = (props) => {
  const [activeConv, setActiveConv] = useState(0);

  return (
    <div
      className="container-fluid py-5 my-0"
      style={{ width: "100%", height: "100%" }}
    >
      <div className="row">
        {/* <NavBar /> */}
        <Conversations convs={props.convs} activate={setActiveConv} />
        <ConversationTab myId={1} msgs={props.convs[activeConv].msgs} />
      </div>
    </div>
  );
};

export default Chat;
