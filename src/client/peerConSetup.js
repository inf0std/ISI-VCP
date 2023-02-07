const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1,
};

let config = {};

export default class RoomHandler {
  constructor(s, id, l_s, setstrm, strm) {
    this.socket = s;
    this.userId = id;
    this.localStream = l_s;
    this.members = [];
    this.setStreams = setstrm;
    this.streams = strm;
  }

  setupSocket = (s) => {
    this.socket = s;
  };

  setupUserId = (id) => {
    this.userId = id;
  };

  setupStreams = (s, set) => {
    this.streams = s;
    this.setStreams = set;
  };

  setupLocalStream = (local) => {
    this.localStream = local;
  };

  addUserBatch = (users) => {
    console.log("addUserBatch", users);
    users.forEach((user) => {
      console.log("user", user);
      this.addUser(user);
    });
  };

  addJoinedUser = (user) => {
    this.addUser(user);
    this.sendOffer(user.id);
  };

  addUser = (user) => {
    console.log("addUser", user);
    this.members.push({ ...user, peer: this.createPeer(user.id) });
  };

  handleOffer = (offer, id) => {
    console.log("handleOffer", id);
    this.members[this.findMember(id)].peer.setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    this.sendAnswer(id);
  };

  handleAnswer = (answer, id) => {
    console.log("handleAnswer", id);
    this.members[this.findMember(id)].peer.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  };

  handleIce = (id, ice) => {
    this.members[this.findMember(id)].peer.addIceCandidate(
      new RTCIceCandidate(ice)
    );
  };

  findMember = (id) => {
    return this.members.findIndex((user) => {
      return user.id == id;
    });
  };

  createOffer = async (id) => {
    return this.members[this.findMember(id)].peer.createOffer(offerOptions);
  };

  createAnswer = async (id) => {
    return this.members[this.findMember(id)].peer.createAnswer();
  };

  sendOffer = (id) => {
    console.log("sendOffer", id);
    let i = this.findMember(id);
    this.createOffer(id)
      .then((offer) => {
        this.members[i].peer.setLocalDescription(offer);
        this.socket.emit("offer", {
          senderId: this.userId,
          receiverId: this.members[i].id,
          offer: offer,
          socketId: this.members[i].socketId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sendAnswer = (id) => {
    console.log("sendAnswer", id);
    let i = this.findMember(id);
    this.createAnswer(id)
      .then((answer) => {
        this.members[i].peer.setLocalDescription(answer);
        this.socket.emit("answer", {
          senderId: this.userId,
          receiverId: this.members[i].id,
          socketId: this.members[i].socketId,
          answer: answer,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sendIce = (id) => (ice) => {
    this.socket.emit("ice", {
      senderId: this.userId,
      receiverId: id,
      socketId: this.members[this.findMember(id)].socketId,
      ice: ice,
    });
  };

  handleLeaveEvent = (id) => {
    this.members.splice(this.findMember(id), 1);
    let s_copy = this.streams.slice();
    s_copy.splice(
      s_copy.findIndex((s) => s.id == id),
      1
    );
    this.setStreams(s_copy);
  };

  handleTrack = (id) => (e) => {
    console.log("handleTrack");
    this.setStreams([...this.streams, { stream: e.streams[0], id: id }]);
  };

  createPeer = (id) => {
    let peer = new RTCPeerConnection(config);
    peer.ontrack = this.handleTrack(id);
    peer.onicecandidate = this.sendIce(id);
    this.localStream &&
      this.localStream
        .getTracks()
        .forEach((track) => peer.addTrack(track, this.localStream));
    return peer;
  };
}
