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
        }}>
      
        {props.msg.senderId}
      </div>
      <div className="p-2" style={{}}>
        <p
          style={{
            margin: "auto",
            display: "inline-block",
            borderRadius: "3px",
            backgroundColor: "cyan",
            border: "solid black 1px",
          }}>
        
          {props.msg.content}
        </p>
      </div>
    </div>
  );
};

export default Msg;
