<<<<<<< HEAD
import React from 'react'
import Msg from '../msg/Msg.js'

const MessagesTab = (props)=>{
    return (<div>
        { console.log(props.msgs)}
       { props.msgs.map((m) => <Msg msg = {m}/>)}
    </div>)
}

export default MessagesTab;
=======
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
>>>>>>> db
