import { useState } from "react";

import Conversations from "../component/conversations/conversations";
import ConversationTab from "../component/conversationTab/conversationTab";
const Chat = (props) => {
  const [activeConv, setActiveConv] = useState(0);
  return (
    <div className="container" style={{ width: "100%" }}>
      <div className="row">
        <Conversations convs={props.convs} activate={setActiveConv} />
        <ConversationTab msgs={props.convs[activeConv].msgs} />
      </div>
    </div>
  );
};

export default Chat;
