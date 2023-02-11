module.exports = (server) => {
  //creation de serveur socketio
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  const rooms = {};
  io.on("connection", (socket) => {
    console.log("socket connected");

    socket.on("join", ({ uid, roomid }) => {
      if (rooms[roomid]) {
        socket.emit("msgs", { msgs: rooms[roomid].msgs });
        socket.to(roomid).emit("joined", { uid, roomid, socketid: socket.id });
        socket.join(roomid);
      } else {
        socket.join(roomid);
        rooms[roomid] = { msgs: [] };
      }
    });

    socket.on("offre", ({ signal, socketid }) => {
      socket.to(socketid).emit("offre", { signal, socketid: socket.id });
    });

    socket.on("answer", ({ signal, socketid }) => {
      console.log("jai recu un answer");
      socket.to(socketid).emit("answer", { signal, socketid: socket.id });
    });

    socket.on("msg", ({ roomid, message }) => {
      rooms[roomid].msgs.push(message);
      console.log(rooms[roomid].msgs);
      //io.to(roomid).emit("msg", { message });
      socket.to(roomid).emit("msg", { message });
    });
  });
};
