import React from "react";
import Conversation from "../conversation/Conversation";
import { memo } from "react";
import { MDBCard, MDBCardHeader } from "mdb-react-ui-kit";

const ConversationList = (props) => {
  return (
    <MDBCard>
      <MDBCardHeader>
        <MDBCardBody>
          <MDBTypography listUnStyled className="mb-0">
            {props.list.map((conv) => {
              return (
                <Conversation
                  name={
                    conv.name || conv.MSGs[conv.MSGs.length - 1].sender.name
                  }
                  image={conv.convImage || }
                  lastMSG={conv.MSGs[conv.MSGs.length - 1]}
                />
              );
            })}
          </MDBTypography>
        </MDBCardBody>
      </MDBCardHeader>
    </MDBCard>
  );
};

export default memo(ConversationList);
