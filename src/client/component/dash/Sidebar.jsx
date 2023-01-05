import React, { useState } from "react";
import "./Sidebar.css";
//import Logo from "../../../imgs/logo.png";
import Logo from "../../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
//import { SidebarData } from "../Data/Data";
//import { SidebarData } from "../../utils/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
} from "@iconscout/react-unicons";

const Sidebar = (props) => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  console.log(window.innerWidth);

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>Seen</span>
        </div>

        <div className="menu">
          <div
            className={selected === 0 ? "menuItem active" : "menuItem"}
            key={0}
            onClick={() => {
              setSelected(0);
              props.affichage(0);
            }}
          >
            <UilEstate />
            <span>statistics</span>
          </div>
          <div
            className={selected === 1 ? "menuItem active" : "menuItem"}
            key={1}
            onClick={() => {
              setSelected(1);
              props.affichage(1);
            }}
          >
            <UilClipboardAlt />
            <span>users</span>
          </div>

          {/* signoutIcon */}
          <div className="menuItem">
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
