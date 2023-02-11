import React from "react";
import Navbar from "./Navbar";
import Footer1 from "../Footer/Footer1";
import Header from "../headers/ProfileHeader";
import ChatBubble from "../../views/VideoCall/chat/ChatBubble";

function Home({ user, changeUser }) {
  return (
    <div style={{ backgroundColor: "#a0969665" }}>
      <Navbar changeUser={changeUser} user={user} />
      <Header />
      <Footer1 />
    </div>
  );
}

export default Home;
