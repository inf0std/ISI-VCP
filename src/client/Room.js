import RoomHandler from "./peerConSetup";

export default class Room {
  constructor(s, id, rid, l_s, setstrm, strm) {
    this.s = s;
    this.id = id;
    this.rid = rid;
    this.l_s = l_s;
    this.setstrm = setstrm;
    this.strm = strm;
    this.room = new RoomHandler(s, id, l_s, setstrm, strm);
    this.setSocketHandlers();
  }
  setSocketHandlers = () => {
    this.setHandleJoinRoom();
    this.setHandleUserJoined();
    this.setHandleOffer();
    this.setHandleIce();
    this.setHandleAnswer();
  };
  setHandleJoinRoom = () => {
    this.s.on(
      "video-room",
      ({ joined, members, programmedMembers, participant }) => {
        console.log(data);
        this.room.addUserBatch(
          data.members.filter((user) => user.id != this.id)
        );
      }
    );
  };

  setHandleUserJoined = () => {
    this.s.on("user-joined-video", (data) => {
      this.room.addJoinedUser(data);
    });
  };
  setHandleOffer = () => {
    this.s.on("offer", ({ senderId, receiverId, offer }) => {
      this.room.handleOffer(offer, senderId);
    });
  };
  setHandleAnswer = () => {
    this.s.on("answer", ({ senderId, receiverId, answer }) => {
      this.room.handleAnswer(answer, senderId);
    });
  };

  setHandleIce = () => {
    this.s.on("ice", ({ senderId, receiverId, ice }) => {
      this.room.handleIce(senderId, ice);
    });
  };

  connect = () => {
    this.s.emit("video-room", { userId: this.id, roomId: this.rid });
  };
}
