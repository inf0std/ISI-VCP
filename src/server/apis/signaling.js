const conversationManager = require("../../modules/conversationManager");

const socketIo = require("socketio");

module.exports = (server, config) => {
  var io = socketIo.listen(server);

  io.on("connection", (socket) => {
    socket.on("msg", ({ senderId, convId, msg }) => {
      io.to(convId).emit({
        senderId: senderId,
        msg: msg,
      });
      //more treatment here
    });
    socket.on("videoCallRequest", ({ callerId, calleeId }) => {
      io.to(calleeId).emit("videoCallRequeast", {
        callerId: callerId,
        calleeId: calleeId,
        callerSocketId: socket.id,
      });
      //more treatment here
    });
    socket.on("audioCallRequest", ({ callerId, calleeId }) => {
      io.to(calleeId).emit("audioCallRequeast", {
        callerId: callerId,
        calleeId: calleeId,
        callerSocketId: socket.id,
      });
      //more treatment here
    });
    socket.on("videoCallAnswer", ({ callerId, calleeId, callerSocketId }) => {
      io.to(callerSocketId).emit("videoCallAnswer", {
        callerId: callerId,
        calleeId: calleeId,
        calleeSocketId: socket.id,
      });
      //more treatment here
    });
    socket.on("audioCallAnswer", ({ callerId, calleeId, callerSocketId }) => {
      io.to(callerSocketId).emit("audioCallAnswer", {
        callerId: callerId,
        calleeId: calleeId,
        calleeSocketId: socket.id,
      });
      //more treatment here
    });
    socket.on("videoCallReject", ({ callerId, calleeId, callerSocketId }) => {
      io.to(callerSocketId).emit("videoCallReject", {
        callerId: callerId,
        calleeId: calleeId,
        calleeSocketId: socket.id,
      });
      //more treatment here
    });
    socket.on("audioCallReject", ({ callerId, calleeId, callerSocketId }) => {
      io.to(callerSocketId).emit("audioCallReject", {
        callerId: callerId,
        calleeId: calleeId,
        calleeSocketId: socket.id,
      });
      //more treatment here
    });
    socket.on("offer", ({ offer, callerId, calleeId, calleeSocketId }) => {
      io.to(calleeSocketId).emit("offer", {
        callerId: callerId,
        calleeId: calleeId,
        calleeSocketId: socket.id,
        offer: offer,
      });
      //more treatment here
    });
    socket.on("answer", ({ answer, callerId, calleeId, callerSocketId }) => {
      io.to(callerSocketId).emit("answer", {
        callerId: callerId,
        calleeId: calleeId,
        calleeSocketId: socket.id,
        answer: answer,
      });
      //more treatment here
    });
    socket.on("ice", ({ ice, senderId, receiverId, receiverSocektId }) => {
      io.to(receiverSocketId).emit("audioCallAnswer", {
        senderId: senderId,
        receiverId: receiverId,
        senderSocketId: socket.id,
      });
      //more treatment here
    });
  });
};
