//keep trace of opened videorooms
let rooms = [{ id: 1, memebers: [], open: true, programmedMemebers: [] }];

//unconditional join
const join = (room, userId, socketId) => {
  //check if user already joined this videoroom
  console.log("room", room);
  user = room.memebers.find((member) => member.id == userId);
  if (user) return { joined: false, alreadyJoined: true };
  let users = room.memebers;
  room.memebers.push({ id: userId, socketId: socketId });
  return {
    joined: true,
    memebers: users,
    open: room.open,
    programmedMemebers: room.programmedMemebers,
  };
};

//create a new room
const Room = (roomId) => {};

//join with verification
const joinRoom = (userId, socketId, roomId) => {
  room = findRoom(roomId);
  //if(!room)return {joined: false, notExists: true}
  if (room.open) {
    return join(room, userId, socketId);
  } else if (room.programmedMemebers.indexOf(userId) >= 0) {
    return join(room, userId, socketId);
  }
};

//quitter la videoroom
const leaveRoom = (userId, roomId) => {};

//rechercher la videoroom
const findRoom = (roomId) => {
  return rooms.find((room) => room.id == roomId);
};
module.exports = { joinRoom };
