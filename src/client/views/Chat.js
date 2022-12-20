import { useRef } from "react";

const Chat = () => {
  const listeConversation = useRef();
  return (
    <div className="container mw-100 mh-100">
      <div className="row" id="conversations">
        <div
          className="col-3 h-40"
          style={{ backgtoundColor: "red" }}
          ref={listeConversation}
        >
          {" "}
          <p>
            Chat interface
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
