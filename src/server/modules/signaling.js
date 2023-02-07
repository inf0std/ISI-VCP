const { joinRoomIfAuthorised } = require("./videoRoomManager");

module.exports = (server) => {
  //creation de serveur socketio
  const io = require("socket.io")(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET"] },
  });

  //juste pour garder le nombre d'utilisateur connecte
  let nb_socket = 0;

  //event handlers
  io.on("connection", (socket) => {
    nb_socket++;
    console.log(
      `user connected with socket ${socket.id}, users number is${nb_socket}`
    );

    socket.on("user-room", ({ userId }) => {
      socket.join(`user-${userId}`);
    });

    socket.on("video-room", ({ roomId, userId }) => {
      console.log(`user ${userId} attempts to join room ${roomId}`);
      let res = joinRoomIfAuthorised(userId, socket.id, roomId);
      if (res.joined) {
        if (res.type === "call" || res.type === "reunion")
          socket.join(`video-${roomId}`);
        socket
          .to(`video-${roomId}`)
          .emit("user-joined-video", { id: userId, socketId: socket.id });
      }
      socket.emit("video-room", res);
    });

    socket.on("offer", ({ senderId, receiverId, socketId, offer }) => {
      socket.to(socketId).emit("offer", { senderId, receiverId, offer });
    });

    socket.on("answer", ({ senderId, receiverId, socketId, answer }) => {
      socket.to(socketId).emit("answer", { senderId, receiverId, answer });
    });

    socket.on("ice", ({ senderId, receiverId, socketId, ice }) => {
      socket.to(socketId).emit("ice", { senderId, receiverId, ice });
    });
  });
};
