import React from "react";
import { useState } from "react";
import { memo } from "react";

const seconndsInMinute = 60;
const secondsInHour = 3600;
const secondsInDay = 3600 * 24;
const secondsInMonth = 3600 * 24 * 30;
const secondsInYear = 3600 * 24 * 365;

const Conversation = (props) => {
  const msgTimeCommentary = (time) => {
    timeS = Number.parseInt((Date.now() - time) / 1000);
    if (timeS < 60) return "aujourd'hui.";
    if (timeS < 3600) return `il y'a ${Number.parseInt(timeS / 60)} minutes.`;
    if (timeS < 3600 * 24)
      return `il y'a ${Number.parseInt(timeS / 3600)} heures.`;

    return `${new Date(time).toDateString}`;
  };
  const calculateElapsedTime = (time) => {
    return Date.now() - time;
  };

  return (
    <li className="p-2 border-bottom" style={{ backgroundColor: "#eee" }}>
      <a href="#!" className="d-flex justify-content-between">
        <div className="d-flex flex-row">
          <MSGBule profileImage={props.image} />
          <div className="pt-1">
            <p className="fw-bold mb-0">{props.conversationName}</p>
            <p className="small text-muted">{props.lastMSG.content}</p>
          </div>
        </div>
        <div className="pt-1">
          <p className="small text-muted mb-1">props.lastMSG.time</p>
          <span className="badge bg-danger float-end">props.NbUnseen</span>
        </div>
      </a>
    </li>
  );
};

export default memo(Conversation);
