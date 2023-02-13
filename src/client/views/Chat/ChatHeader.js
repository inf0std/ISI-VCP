const ChatHeader = (props) => {
  return (
    <>
      <div
        style={{
          marginRight: "0px",
          width: "auto",
          padding: "10px",
          border: "solid grey 1px",
          backgroundColor: "#DCF9F9",
        }}
      >
        <div
          className="circle-img"
          style={{
            borderRadius: "50%",
            display: "inline-block",
            width: "40px",
            height: "40px",
          }}
        >
          <img
            src={
              /* `http://127.0.0.1:80/api/router/conversation/${props.conv.id}/image.jpg` */
              "he"
            }
          />
        </div>

        <p
          className="conversation-name"
          style={{
            position: "absolute",
            left: "60px",
            display: "inline-block",
          }}
        >
          {
            /* props.conv.name || "conv" + props.conv.id */ <strong>
              "conversation name"
            </strong>
          }
        </p>
        <ul
          style={{
            display: "inline-block",
            position: "absolute",
            right: "0px",
            textAlign: "right",
          }}
        >
          <li
            className="nav-item"
            style={{ margin: "0 10px 0 10px", display: "inline-block" }}
          >
            <a className="nav-link" href="#">
              <i
                style={{ color: "#96be25", fontSize: "20px" }}
                className="fas fa-phone"
              ></i>
            </a>
          </li>
          <li
            className="nav-item"
            style={{ margin: "0 10px 0 10px ", display: "inline-block" }}
          >
            <a className="nav-link" href="#">
              <i
                style={{ margin: "auto", color: "#96be25", fontSize: "20px" }}
                className="fas fa-camera"
              ></i>
            </a>
          </li>
          <li
            className="nav-item"
            style={{ margin: "auto", display: "inline-block" }}
          >
            <a className="nav-link" href="#">
              <i
                style={{ margin: "auto", color: "#96be25", fontSize: "20px" }}
                className="fas fa-cog"
              ></i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ChatHeader;
