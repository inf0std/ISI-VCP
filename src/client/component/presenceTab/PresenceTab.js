import React from "react";

const PresenceTab = (props) => {
  return (
    <div>
      {props.map((user) => {
        return <PresenceElement personnes={props.users} />;
      })}
    </div>
  );
};
