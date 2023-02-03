import React from "react";
import SideBarProfile from "./SideBarprofile";
import Navbarprofile from "./Navbarprofile";
import "./Sidebar.css";
export default function Profile() {
  return (
    <div>
      <Navbarprofile />
      <SideBarProfile />
    </div>
  );
}
