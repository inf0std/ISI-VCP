module.exports = (server) => {
  //creation de serveur socketio
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  rooms = {};
  io.on("connection", (socket) => {
    console.log("socket connected");
    socket.on("join", (roomid) => {
      if (rooms[roomid]) {
        socket.join(roomid);
        socket.to(roomid).emit("joined", { roomid, socketid: socket.id });
      } else {
        rooms[roomid] = [socket.id];
        //socket.emit("joined", { roomid, socketid: socket.id });
      }
      socket.join(roomid);
    });

    socket.on("offre", ({ signal, socketid }) => {
      socket.to(socketid).emit("offre", { signal, socketid: socket.id });
    });

    socket.on("answer", ({ signal, socketid }) => {
      console.log("jai recu un answer");
      socket.to(socketid).emit("answer", { signal, socketid: socket.id });
    });
  });
};

/* 
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
 */
