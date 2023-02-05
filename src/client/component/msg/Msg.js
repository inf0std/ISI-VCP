<<<<<<< HEAD
import React from 'react'
=======
>>>>>>> 4cad2219062e5916d32471d254b6ab619e527c5c
const Msg = (props) => {
  return (
    <div
      className={"d-flex" + (props.isme ? " flex-row-reverse" : " flex-row")}
    >
      <div
        className="sender-profile"
        style={{
          width: "30px",
          height: "30px",
          marginTop: "5px",
          borderRadius: "50%",
          border: "solid black 1px",
        }}
      >
        {props.msg.senderId}{" "}
      </div>{" "}
      <div className="p-2" style={{}}>
        <p
          style={{
            margin: "auto",
            padding: "1px 13px",
            display: "inline-block",
            borderRadius: "15px",
            backgroundColor: props.isme ? "#e6ebe7" : "#cacccb",
            border: "solid black 1px",
          }}
        >
          {props.msg.content}{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
};
export default Msg;
