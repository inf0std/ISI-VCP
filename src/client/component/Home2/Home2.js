import React from "react";
import Navbar from "./Navbar";
import Footer1 from "../Footer/Footer1";
import Header from "../headers/ProfileHeader";

function Home(props) {
  return (
    <div style={{ backgroundColor: "#a0969665" }}>
      <Navbar generalHandler={props.generalHandler} />
      <Header />
      <Footer1 />
    </div>
  );
}

export default Home;
