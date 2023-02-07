import {
  addUser,
  addUserBatch,
  setupUserId,
  setupSocket,
  setupLocalStream,
  setupStreams,
  handleAnswer,
  handleIce,
  handleOffer,
  handleLeaveEvent,
} from "./peerConSetup";

const setHandleJoinRoom = (s, userId) => {
  s.on("video-room", (data) => {
    console.log(data);
    addUserBatch(data.members.filter((user) => user.id != userId));

    console.log("video-room joining", data);
  });
};
const setHandleUserJoined = (s) => {
  s.on("user-joined-video", (data) => {
    console.log("userJoined", data);

    addUser(true, data);
  });
};
const setHandleOffer = (s) => {
  s.on("offer", ({ senderId, receiverId, offer }) => {
    handleOffer(offer, senderId);
  });
};
const setHandleAnswer = (s) => {
  s.on("answer", ({ senderId, receiverId, answer }) => {
    handleAnswer(answer, senderId);
  });
};
const setHandleIce = (s) => {
  s.on("ice", ({ senderId, receiverId, ice }) => {
    handleIce(senderId, ice);
  });
};

export {
  setHandleAnswer,
  setHandleIce,
  setHandleJoinRoom,
  setHandleOffer,
  setHandleUserJoined,
};
