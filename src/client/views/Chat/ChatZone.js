import { useRef } from "react";
const ChatZone = (props) => {
  let msg = useRef();
  return (
    <div>
      <div
        style={{
          display: "block",
          position: "absolute",
          top: "0px",
          bottom: "0px",
          width: "auto",
          height: "auto",
        }}
      >
        {props.msgs.map((msg) => {
          return (
            <div>
              <img src={`http:127.0.0.1:80/profile/${msg.senderId}.jpg`}></img>
              <div style={{ borderRadius: "10px" }}>
                <p></p>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          border: "solid gray 1px",
          display: "inline-block",
          position: "absolute",
          bottom: "0px",
          right: "0px",
          left: "0px",
          height: "60px",
        }}
      >
        <form>
          <textarea
            type="text"
            ref={msg}
            style={{
              display: "inline-block",
              position: "fixed",
              width: "auto",
              height: "100%",
              right: "40px",
              left: "0px",
            }}
          ></textarea>
          <a
            style={{
              display: "inline-block",
              position: "absolute",
              right: "0px",
              padding: "5px",
            }}
          >
            <i
              style={{
                display: "inline-block",
                fontSize: "30px",
                right: "10px",
                color: "#96be25",
                textAlign: "center",
              }}
              className="fas fa-paper-plane"
            ></i>
          </a>
        </form>
      </div>
    </div>
  );
};

export default ChatZone;
