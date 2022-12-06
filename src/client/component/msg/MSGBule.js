import React from "react";
import { memo } from "react";
import "./MSGBule.css";
const MSGBule = (props) => {
  return (
    <div className="mini-profile">
      <img
        src={props.msg.profileImage}
        alt="avatar"
        className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
        width="60"
      />
    </div>
  );
};

export default memo(MSGBule);
