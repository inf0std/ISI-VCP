const ConvElement = (props) => {
  return (
    <div
      className="conv-element"
      onClick={() => {
        props.activate(props.index);
      }}
      style={{backgroundColor:'#dcf2e2', borderRadius:'12px'}}
    >
      <div className="conv-cover py-1">
        <img
          style={{
            width: "50px",
            height: "5opx",
            borderRadius: " 50%",
            display: "inline-block"
          }}
          src="#" />
      </div>
      <div className={"last-msg" + (!props.msg.seen && "unseen")}>
        <h5>{props.conv.name}</h5>
        <p>{props.msg.content}</p>
      </div>
    </div>
  );
};

export default ConvElement;
