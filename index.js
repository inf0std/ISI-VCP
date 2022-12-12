const userManager = require("./src/server/modules/usersManager");
const conversationManager = require("./src/server/modules/conversationManager");

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

user1 = {
  id: 1,
  sockets: [],
};

user2 = {
  id: 3,
  sockets: [],
};

user3 = {
  id: 2,
  sockets: [],
};

io.on("connection", (socket) => {
  console.log("connected to", socket.id);
  //socket.join("room1");
  console.log("rooms", socket.rooms);
  /*io.to("room1").emit("msg", {
    room: "room1",
    msg: "joined room1",
  });//*/

  socket.on("msg", (data) => {
    console.log(socket.rooms);
    io.to(data.room).emit("msg", data);
    console.log("msg send", data.room, data);
  });

  socket.on("userId", (data) => {
    switch (data.id) {
      case 1:
        user1.sockets.push(socket);
        console.log(user1);
        break;
      case 2:
        user2.sockets.push(socket);
        console.log(user2);
        break;
      case 3:
        user3.sockets.push(socket);
        console.log(user3);
        break;
    }
  });

  socket.on("joinConv", (data) => {
    socket.join("room1");
    io.to("room1").emit("msg", {
      room: "room1",
      msg: "user" + data.id + "joined the room",
    });
  });
});

let PORT = 4000;
server.listen(PORT, () => {
  console.log("Listening in the port", PORT);
});
