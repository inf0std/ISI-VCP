const express = require("express");
const Server = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = Server(server);
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.status(200);
  res.send("connected");
});

io.on("connection", (socket) => {
  console.log("connected to", socket.id);
  socket.join("room1");
  console.log("rooms", socket.rooms);
  io.to("room1").emit("msg", {
    room: "room1",
    msg: "joined room1",
  });

  socket.on("msg", (data) => {
    console.log(socket.rooms);
    io.to(data.room).emit("msg", data);
    console.log("msg send", data.room, data);
  });
});

let PORT = 4000;
server.listen(PORT, () => {
  console.log("Listening in the port", PORT);
});
