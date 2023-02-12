module.exports = (server) => {
  //creation de serveur socketio
  const io = require("socket.io")(server, {
    cors: {
      origin: process.env.APP_URL,
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
    socket.on("end", ({ roomid, sid }) => {
      socket.to(roomid).emit("end", { sid });
    });

    socket.on("disconnect", () => {
      console.log(socket.rooms);
    });
  });
};
