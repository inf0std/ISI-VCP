import { useState, useEffect } from "react";
// import NavBar from '../component/navbar/NavBar'

import ChatHeader from "./Chat/ChatHeader";
import ChatZone from "./Chat/ChatZone";
import ChatList from "./Chat/ChatList";
const Chat = ({ generalHandler, localVars }) => {
  const [activeConv, setActiveConv] = useState(0);
  const [msgs, setMsgs] = useState([]);
  useEffect(() => {});
  const sendMessage = () => {};
  return (
<div>
      <ChatHeader />
      <ChatList />
      <ChatZone />
</div>
  );
};

export default Chat;
