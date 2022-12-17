
import "./App.css";
import Chat from "./views/Chat";
const convs = [
  {
    name: "conv-1",
    msgs: [
      {
        senderId: 1,
        content: "hello",
      },
      {
        senderId: 2,
        content: "hello there",
      },
      {
        senderId: 1,
        content: "how are you doing",
        seen: true,
      },
    ],
  },
  {
    name: "conv-2",
    msgs: [
      {
        senderId: 1,
        content: "hello",
      },
      {
        senderId: 2,
        content: "hello there",
      },
      {
        senderId: 1,
        content: "how are you doing",
      },
      {
        senderId: 1,
        content: "fine, how about you",
        seen: false,
      },
    ],
  },
];
function App() {
  return (
    <>
      <Chat convs={convs} />
    </>
  );
}

export default App;
