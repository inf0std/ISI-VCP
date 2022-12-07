import React from "react";
import { memo } from "react";
import Msg from "../msg/Msg.js";
import { MDBTypography } from "mdb-react-ui-kit";
const MessagesTab = (props) => {
  return (
    <MDBTypography listUnStyled>
      {props.msgList.map((m) => (
        <Msg msg={m} />
      ))}
    </MDBTypography>
  );
};

export default memo(MessagesTab);
