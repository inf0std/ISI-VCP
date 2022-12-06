import React from "react";

const PresenceElement = (props) => {
  return (
    <div>
      <img src={"./user/" + props.user.profile}></img>
    </div>
  );
};
