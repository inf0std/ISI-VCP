import config from "../config.json";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
// import NavBar from '../component/navbar/NavBar'
import Conversations from "../component/conversations/conversations";
import ConversationTab from "../component/conversationTab/conversationTab";

const Chat = ({ user, chageUser }) => {
  const [convs, setConvs] = useState([]);
  const [activeConv, setActiveConv] = useState(0);
  const [isLoading, setIsloading] = useState(true);
  const socket = useRef(null);
  useEffect(() => {});

  const sendMsg = (cid, msg) => {
    socket.current.emit("msg", { cid, msg });
  };
  return (
    <div
      className="container-fluid py-5 my-0"
      style={{ width: "100%", height: "100%" }}
    >
      <div className="row">
        {/* <NavBar /> */}
        <Conversations convs={convs} setActive={setActiveConv} />
        <ConversationTab myId={1} id={activeConv} />
      </div>
    </div>
  );
};

export default Chat;
