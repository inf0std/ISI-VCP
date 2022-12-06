import { MDBCard, MDBCardBody, MDBCardHeader, MDBIcon } from "mdb-react-ui-kit";
import { useState } from "react";
import { memo } from "react";
import "./MSGContent.css";
const calculDuree = (time) => {
  return "";
};

const MSGContent = (props) => {
  return (
    <MDBCard>
      <MDBCardHeader className="d-flex justify-content-between p-3">
        <p className="fw-bold mb-0">{props.msg.username}</p>
        <p className="text-muted small mb-0">
          <MDBIcon far icon="clock" /> {calculDuree(props.msg.date)}
        </p>
      </MDBCardHeader>
      <MDBCardBody>
        <p className="mb-0">{props.msg.content}</p>
      </MDBCardBody>
    </MDBCard>
  );
};

export default memo(MSGContent);
