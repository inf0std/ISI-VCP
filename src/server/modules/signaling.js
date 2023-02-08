const VManager = require("./videoRoomManager");

VManager.addRoom(1, "call", true, [], [], null, 0, 0);
VManager.addRoom(2, "debate", true, [], [], null, 0, 0);
VManager.addRoom(3, "reunion", false, [], [1, 2, 3], null, 0, 0);
VManager.addRoom(4, "conference", true, [], [], null, 0, 0);
VManager.addRoom(5, "call", false, [1, 4, 5], [], null, 0, 0);
VManager.addRoom(6, "call", true, [], [], null, 0, 0);
module.exports = (server) => {
  //creation de serveur socketio
  const io = require("socket.io")(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET"] },
  });

  //juste pour garder le nombre d'utilisateur connecte
  let nb_socket = 0;

  //event handlers
  io.on("connection", (socket) => {
    console.log(`user connected with socket ${socket.id}`);
    //ajouter la socket au groupe de socket de l'utilisateur
    socket.on("user-room", ({ userId }) => {
      socket.join(`user-${userId}`);
      socket.uid = userId;
    });

    socket.to(`user-${socket.uid.emit}`);

    //gestion d'evenement des room video
    socket.on("video-room", ({ rid }) => {
      if (socket.vrid)
        socket.emit("video-room", {
          joined: false,
          inRoom: true,
          rid: socket.vrid,
        });
      //console.log(`user ${socket.uid} attempts to join room ${rid}`);

      let res = VManager.joinRoomIfAuthorised(rid, socket.uid, socket.id);
      //console.log("join result", res);
      if (res.joined) {
        //ajouter utilisateur a la room
        socket.join(`video-${rid}`);
        socket.vrid = rid;
        socket.p = res.isPart;
        if (res.isPart) {
          //ajouter utilisateur au cote participant
          //console.log("broadcasting part joined");
          socket.join(`video-${rid}-part`);
          socket
            .to(`video-${rid}`)
            .emit("part-joined", { id: socket.uid, sid: socket.id });
          //console.log(socket.rooms);
        } else {
          //ajouter  utilisateur cote audience
          socket.join(`video-${rid}-aud`);
          socket
            .to(`video-${rid}-part`)
            .emit("aud-joined", { id: socket.uid, sid: socket.id });
        }
      }
      socket.emit("video-room", res);
    });

    //signaling for p2p connection establishement
    // delivering offer
    socket.on("offer", ({ offer, sid }) => {
      console.log("offer", socket.uid);
      socket.to(sid).emit("offer", { id: socket.uid, offer });
    });
    //delivering answer
    socket.on("answer", ({ answer, sid }) => {
      console.log("answer", socket.uid);
      socket.to(sid).emit("answer", { id: socket.uid, answer });
    });

    //delivering icecandidate
    socket.on("ice", ({ to, ice }) => {
      console.log("ice", to, socket.uid);
      socket.to(to).emit("ice", { id: socket.uid, ice });
    });

    //leave
    socket.on("leave-video-room", () => {
      leaveVideoRoom(socket);
    });
    socket.on("end-video-room", () => {});
    //gestion des evenement de messagerie

    //en deconnexion de la socket
    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`);

      if (socket) socket.leaveAll();
    });

    const leaveVideoRoom = (s) => {
      if (VManager.leaveRoom(s.vrid, s.uid, s.p)) {
        if (s.p) {
          s.to(`video-${s.vrid}`).emit("leave-room", { id: s.uid });
          s.leave(`video-${s.vrid}`);
          s.leave(`video-${s.vrid}-part`);
        } else {
          s.to(`video-${s.vrid}-part`).emit("leave-room", { id: s.uid });
          s.leave(`video-${s.vrid}-aud`);
          s.leave(`video-${s.vrid}`);
        }
        s.vrid = null;
      }
    };
  });
};
