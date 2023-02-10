module.exports = (server) => {
  //creation de serveur socketio
  const io = require("socket.io")(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
  });

  const rooms = {};
  io.on("connection", (socket) => {
    console.log("socket connected");
    socket.on("join", ({ rid, id }) => {
      console.log(rid, id);
      if (!rooms[rid]) rooms[rid] = [];
      if (!socket.rid) {
        console.log(rooms);
        socket.emit("ids", { ids: rooms[rid] });
        rooms[rid].push({ id, sid: socket.id });
        console.log(rooms);
        socket.uid = id;
        socket.to(rid).emit("joined", { id: id, sid: socket.id });
        socket.join(rid);
        socket.rid = rid;
      }
    });

    socket.on("offer", (offer) => {
      socket.to(offer.sid, {
        id: offer.id,
        sid: socket.id,
        offer: offer.offer,
      });
    });

    socket.on("answer", (answer) => {
      socket.to(answer.sid, {
        id: answer.id,
        sid: socket.id,
        offer: answer.answer,
      });
    });

    socket.on("disconnect", () => {
      socket.rooms.forEach((room) => {
        socket.emit("peer-disconnected", socket.uid);
        socket.leave(room);
      });
    });
  });
};
