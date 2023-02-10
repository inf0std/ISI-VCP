import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBarProfile from "./SideBarprofile";
import Navbarprofile from "./Navbarprofile";
import "./Sidebar.css";
export default function Profile({ user, changeUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    //if (!user.id) navigate("/");
  }, []);

  return (
    <div>
      <Navbarprofile />
      <SideBarProfile />
    </div>
  );
}
