class VideoRoomManager {
  constructor() {
    this.rooms = [];
  }

  addRoom = (roomId, type, isOpen, prgAud, prgPart, mod, start, dur) => {
    if (!this.findRoom(roomId))
      this.rooms.push({
        id: roomId,
        type: type,
        isOpen: isOpen,
        aud: [],
        part: [],
        prgAud: prgAud,
        prgPart: prgPart,
        mod: mod,
        start: start,
        dur: dur,
      });
    else console.log(`Room with ID ${roomId} already exists`);
  };

  joinRoomIfAuthorised = (roomId, userId, socketId) => {
    let room = this.findRoom(roomId);
    if (this.isAlreadyJoined(roomId, userId))
      return { joined: false, isjoined: true };
    if (room) {
      if (this.isAuthorised(roomId, userId)) {
        if (this.isParticipant(roomId, userId)) {
          return this.participate(room, userId, socketId);
        }
        return this.watch(room, userId, socketId);
      }
    }
  };

  loadRoom = (roomId, userId) => {};

  leaveRoom = (roomId, userId, p) => {
    let room = this.findRoom(roomId);
    let uIndex;
    if (p) {
      uIndex = room.part.indexOf(userId);
      if (uIndex >= 0) {
        room.part.splice(uIndex, 1);
        return true;
      }
      return false;
    } else {
      uIndex = room.aud.indexOf(userId);
      if (uIndex >= 0) {
        room.aud.splice(uIndex, 1);
        return true;
      }
      return false;
    }
  };

  participate = (room, userId, socketId) => {
    room.part.push({ id: userId, sid: socketId });
    return {
      joined: true,
      part: room.part,
      prgPart: room.prgPart,
      aud: room.aud,
      isPart: true,
      type: room.type,
      mod: room.mod,
      start: room.start,
      dur: room.dur,
    };
  };

  watch = (room, userId, socketId) => {
    room.aud.push({ id: userId, sid: socketId });
    return {
      joined: true,
      part: room.part,
      prgPart: room.prgPart,
      aud: [],
      isPart: false,
      type: room.type,
      mod: room.mod,
      start: room.start,
      dur: room.dur,
    };
  };

  isAuthorised = (roomId, userId) => {
    let room = this.findRoom(roomId);
    if (room.isOpen) return true;
    if (room.prgAud.findIndex((id) => id == userId) >= 0) return true;
    if (room.prgPart.indexOf((id) => id == userId) >= 0) return true;
    return false;
  };

  isAlreadyJoined = (roomId, userId) => {
    let room = this.findRoom(roomId);
    if (room) {
      if (room.part.findIndex((p) => p.id == userId) >= 0) return true;
      return room.aud.findIndex((a) => a.id == userId) >= 0;
    }
    return false;
  };

  isAudience = (roomId, userId) => {
    let room = this.findRoom(roomId);
    return room.prgAud.indexOf(userId) >= 0;
  };

  isParticipant = (roomId, userId) => {
    let room = this.findRoom(roomId);
    return room.isOpen || room.prgPart.indexOf(userId) >= 0;
  };

  findRoom = (roomId) => {
    return this.rooms.find((room) => room.id == roomId);
  };
}
module.exports = new VideoRoomManager();
