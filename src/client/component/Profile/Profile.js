import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBarProfile from "./SideBarprofile";
import Navbarprofile from "./Navbarprofile";
import "./Sidebar.css";
export default function Profile(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.localVars.user.id) navigate("/");
  }, []);

  return (
    <div>
      <Navbarprofile />
      <SideBarProfile />
    </div>
  );
}
