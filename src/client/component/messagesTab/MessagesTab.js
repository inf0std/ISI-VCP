import React from "react";
import { memo } from "react";
import MSG from "../msg/MSG.js";
import { MDBTypography } from "mdb-react-ui-kit";
const MessagesTab = (props) => {
  return (
    <MDBTypography listUnStyled>
      {props.msgList.map((m) => (
        <MSG msg={m} />
      ))}
    </MDBTypography>
  );
};

export default memo(MessagesTab);
