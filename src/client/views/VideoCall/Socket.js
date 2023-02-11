import io from "socket.io-client";
const s = io.connect("localhost:8080");
export default s;
