import React from "react";
import Messagerie from "./component/messagerie/Messagerie";
import MSG from "./component/msg/MSG";
const App = (props) => {
  const msg = () => {
    return (
      <MSG
        msg={{
          isMe: false,
          image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp",
          content: "hello",
          username: "Brad",
          date: "21/12/2022",
        }}
      />
    );
  };
  return <Messagerie />;
};

export default App;
