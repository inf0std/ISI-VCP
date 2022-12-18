<<<<<<< HEAD
class Msg extends React.Component {
    constructor(props){
      super(props)
    }
    render() {
      return (
        <div>ECRIRE VOTRE CODE ICI</div>
      );
    }
  }
=======
import React from "react";
import { memo } from "react";
import { MDBCard } from "mdb-react-ui-kit";
import MSGBule from "./MSGBule";
import MSGContent from "./MSGContent";
import "./MSG.css";
const MSG = (props) => {
  return (
    <MDBCard>
      {!props.msg.isMe && <MSGBule profileImage={props.msg.image} />}
      <MSGContent msg={props.msg} />
      {props.msg.isMe && <MSGBule msg={props.msg} />}
    </MDBCard>
  );
};

export default memo(MSG);
>>>>>>> origin/ui
