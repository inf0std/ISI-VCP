import React from "react";
import "./Sidebar.css";
//import { Avatar } from "@mui/material";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <img className="sidebar_avatar" />
        <h1>Helda</h1>
        <h3>Helda@gmail.com</h3>
        <div className="sidebar_stat">
          <p>Profession:</p>
        </div>
        <div className="addcont">
          <i class="bi bi-person-plus-fill " title="Add new contact"></i>
          <button className="btn">mes contactes</button>
        </div>
      </div>
    </div>
  );
}
