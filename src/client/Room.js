const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1,
};
const config = {};
export default class Room {
  constructor(s, id, rid, l_s, setstrm, strm) {
    this.isPart = null;
    this.part = [];
    this.aud = [];
    this.s = s;
    this.id = id;
    this.rid = rid;
    this.l_s = l_s;
    this.setstrm = setstrm;
    this.strm = strm;
    this.setHandlers();
  }
  setHandlers = () => {
    //this.setHandleJoinRoom();
    //this.setHandleUserJoined();
    this.setHandlePartJoined();
    this.setHandleAudJoined();
    this.setHandleOffer();
    this.setHandleIce();
    this.setHandleAnswer();
  };
  setHandleJoinRoom = () => {
    this.s.on(
      "video-room",
      ({
        joined,
        part,
        isPart,
        prgPart,
        aud,
        prgAud,
        mod,
        type,
        start,
        dur,
      }) => {
        if (joined) {
        }
      }
    );
  };

  /* setHandleUserJoined = () => {
    this.s.on("user-joined-video", (data) => {
      console.log()
      this.room.addJoinedUser(data);
    });
  }; */

  setHandlePartJoined = () => {
    this.s.on("part-joined", (part) => {
      console.log("a participent joined");
      this.addJoinedPart(part);
    });
  };
  setHandleAudJoined = () => {
    this.s.on("aud-joined", (aud) => {
      console.log("an audience joined");
      this.addJoinedAud(aud);
    });
  };
  setHandleOffer = () => {
    this.s.on("offer", ({ id, offer }) => {
      console.log("offer");
      this.handleOffer(offer, id);
    });
  };
  setHandleAnswer = () => {
    this.s.on("answer", ({ id, answer }) => {
      this.handleAnswer(answer, id);
    });
  };

  setHandleIce = () => {
    this.s.on("ice", ({ id, ice }) => {
      this.handleIce(id, ice);
    });
  };

  connect = () => {
    this.s.emit("video-room", { rid: this.rid });
  };

  addBachParticipants = (parts) => {
    parts.forEach((p) => {
      this.addPart(p);
    });
  };
  addPart = (part) => {
    this.part.push({ ...part, peer: this.createPeer(part.id) });
  };

  addBatchAudience = (auds) => {
    if (this.isPart) {
      auds.forEach((a) => {
        this.addAud(a);
      });
    }
  };
  addAud = (aud) => {
    this.aud.push({ ...aud, peer: this.createPeer(aud.id) });
  };

  addJoinedPart = (part) => {
    console.log("part");
    this.addPart(part);
    this.sendOffer(part.id);
  };

  addJoinedAud = (aud) => {
    console.log("aud");
    if (this.isPart) {
      console.log("aud added");
      this.addAud(aud);
      this.sendOffer(aud.id);
    }
  };

  /* 
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
  }; */

  handleOffer = (offer, id) => {
    console.log("handle offer", id);
    const [p, i] = this.findMember(id);
    if (p) {
      console.log(`offer id ${id}, p ${p}, i ${i}`);
      this.part[i].peer.setRemoteDescription(new RTCSessionDescription(offer));
      this.sendAnswer(id);
    } else if (i >= 0) {
      console.log(`offer id ${id}, p ${p}, i ${i}`);
      this.aud[i].peer.setRemoteDescription(new RTCSessionDescription(offer));
      this.sendAnswer(id);
    }
    console.log(`offer id ${id}, p ${p}, i ${i}`);
  };

  handleAnswer = (answer, id) => {
    const [p, i] = this.findMember(id);
    if (p)
      this.part[i].peer.setRemoteDescription(new RTCSessionDescription(answer));
    else if (i >= 0)
      this.aud[i].peer.setRemoteDescription(new RTCSessionDescription(answer));
    else return;
  };

  handleIce = (id, ice) => {
    const [p, i] = this.findMember(id);
    if (p) this.part[i].peer.addIceCandidate(new RTCIceCandidate(ice));
    else if (i >= 0) this.aud[i].peer.addIceCandidate(new RTCIceCandidate(ice));
    else return;
  };

  findMember = (id) => {
    let i = this.part.findIndex((p) => p.id == id);
    if (i >= 0) return [true, i];
    return [false, this.aud.findIndex((a) => a.id == id)];
  };

  createOffer = async (id) => {
    const [p, i] = this.findMember(id);
    if (p) {
      return [p, i, await this.part[i].peer.createOffer()];
    } else if (i >= 0) {
      return [p, i, await this.aud[i].peer.createOffer()];
    }
    return [p, i, null];
  };

  createAnswer = async (id) => {
    const [p, i] = this.findMember(id);
    if (p) {
      return [p, i, await this.part[i].peer.createAnswer()];
    } else if (i >= 0) {
      return [p, i, await this.aud[i].peer.createAnswer()];
    }
    return [p, i, null];
  };

  sendOffer = (id) => {
    console.log("sending offer");
    this.createOffer(id)
      .then(([p, i, offer]) => {
        console.log(p, i, offer);
        let member;
        if (p) member = this.part[i];
        else if (i >= 0) member = this.aud[i];
        else return;
        //sending offer
        member.peer.setLocalDescription(offer);
        this.s.emit("offer", {
          to: member.id,
          offer: offer,
          sid: member.sid,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sendAnswer = (id) => {
    console.log("sendAnswer");
    this.createAnswer(id)
      .then(([p, i, answer]) => {
        console.log(p, i, answer);
        let member;
        if (p) member = this.part[i];
        else if (i >= 0) member = this.aud[i];
        else return;
        //sending offer
        member.peer.setLocalDescription(answer);
        this.s.emit("answer", {
          to: member.id,
          offer: answer,
          sid: member.sid,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sendIce = (id) => (ice) => {
    const [p, i] = this.findMember(id);
    let member;
    if (p) member = this.part[i];
    else if (i >= 0) member = this.aud[i];
    else return;
    this.s.emit("ice", {
      to: id,
      sid: member.socketId,
      ice: ice,
    });
  };

  handleLeaveEvent = (id) => {
    const [p, i] = this.findMember(id);
    if (p) {
      let mem = this.part.splice(i, 1);
      mem.peer.close();
      let s_copy = this.streams.slice();
      s_copy.splice(
        s_copy.findIndex((s) => s.id == id),
        1
      );
      this.setStreams(s_copy);
    } else if (i >= 0) {
      let mem = this.aud.splice(i, 1);
      mem.peer.close();
    } else return;
  };

  handleTrack = (id) => (e) => {
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
