import { useState } from "react";

import Conversations from "../component/conversations/conversations";
import ConversationTab from "../component/conversationTab/ConversationTab";
const Chat = (props) => {
  const [activeConv, setActiveConv] = useState(0);
  return (
    <div className="container-fluid py-5 h-100" style={{ width: "100%" }}>
      <div className="row">
        <Conversations convs={props.convs} activate={setActiveConv} />
        <ConversationTab myId={1} msgs={props.convs[activeConv].msgs} />
      </div>
    </div>
  );
};

export default Chat;
