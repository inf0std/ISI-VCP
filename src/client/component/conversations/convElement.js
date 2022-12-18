const ConvElement = (props) => {
  return (
    <div
      className="conv-element"
      onClick={() => {
        props.activate(props.index);
      }}>
    
      <div className="conv-cover">
        <img
          style={{
            width: "50px",
            height: "5opx",
            borderRadius: " 50%",
            display: "inline-block",
          }}
          src="#">
        </img>
      </div>
      <div className={"last-msg" + (!props.msg.seen && "unseen")}>
        <h3>{props.conv.name}</h3>
        <p>{props.msg.content}</p>
      </div>
    </div>
  );
};

export default ConvElement;
