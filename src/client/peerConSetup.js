const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1,
};
let config = {};
let socket;
let userId;
let localStream;
let members = [];
let setStreams;
let streams;

const setupSocket = (s) => {
  socket = s;
};

const setupUserId = (id) => {
  userId = id;
};

const setupStreams = (s, set) => {
  streams = s;
  setStreams = set;
};

const setupLocalStream = (local) => {
  //console.log("setuplocalstream", local);
  localStream = local;
};

const addUserBatch = (users) => {
  console.log("addUserBatch", users);
  users.forEach((user) => {
    addUser(false, user);
  });
};

const addUser = (joined, user) => {
  console.log("addUser", user);
  user.peer = createPeer();
  var member = user;
  members.push(member);
  localStream.getTracks().forEach((track) => {
    member.peer.addTrack(track, localStream);
  });
  member.peer.onicecandidate = (e) => {
    if (e && e.candidate) sendIce(member.id, e.candidate);
  };
  member.peer.ontrack = handleTrack(member.id);
  if (!joined) sendOffer(member.id);
  //console.log(members);
};

const handleOffer = (offer, id) => {
  console.log("handleOffer", id);
  let i = findMember(id);
  members[i].peer.setRemoteDescription(new RTCSessionDescription(offer));
  sendAnswer(id);
};

const handleAnswer = (answer, id) => {
  console.log("handleAnswer", id);
  let i = findMember(id);
  members[i].peer.setRemoteDescription(new RTCSessionDescription(answer));
};

const handleIce = (id, ice) => {
  //console.log("handleIce", id, ice);
  let i = findMember(id);
  members[i].peer.addIceCandidate(new RTCIceCandidate(ice));
};

const findMember = (id) => {
  let i = members.findIndex((user) => {
    return user.id == id;
  });
  return i;
};

const createOffer = async (id) => {
  let i = findMember(id);
  return members[i].peer.createOffer(offerOptions);
};

const createAnswer = async (id) => {
  let i = findMember(id);
  return members[i].peer.createAnswer();
};

const sendOffer = (id) => {
  console.log("sendOffer", id);
  let i = findMember(id);
  createOffer(id)
    .then((offer) => {
      members[i].peer.setLocalDescription(offer);
      socket.emit("offer", {
        senderId: userId,
        receiverId: members[i].id,
        offer: offer,
        socketId: members[i].socketId,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const sendAnswer = (id) => {
  console.log("sendAnswer", id);
  let i = findMember(id);
  createAnswer(id)
    .then((answer) => {
      members[i].peer.setLocalDescription(answer);
      socket.emit("answer", {
        senderId: userId,
        receiverId: members[i].id,
        socketId: members[i].socketId,
        answer: answer,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const sendIce = (id, ice) => {
  //console.log("sendIce", id, ice);
  let i = findMember(id);
  socket.emit("ice", {
    senderId: userId,
    receiverId: id,
    socketId: members[i].socketId,
    ice: ice,
  });
};

const handleLeaveEvent = (id) => {
  console.log("handleLeaveEvent", id);
  let i = findMember(id);
  members.splice(i, 1);
  let s_copy = streams.slice();
  s_copy.splice(i, 1);
  setStreams(s_copy);
};

const handleTrack = (id) => (e) => {
  console.log("handleTrack", id, e.streams);
  let i = findMember(id);
  streams[i] = e.streams[0];
  setStreams([...streams]);
};

const createPeer = () => {
  return new RTCPeerConnection(config);
};
module.exports = {
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
};
