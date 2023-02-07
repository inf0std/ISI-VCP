//keep trace of opened videorooms
let rooms = [
  { id: 1, members: [], open: true, programmedMembers: [], type: "call" },
  { id: 2, members: [], open: false, programmedMembers: [1, 3], type: "call" },
  { id: 3, members: [], open: true, programmedMembers: [], type: "conference" },
  { id: 4, members: [], open: true, programmedMembers: [], type: "debate" },
  {
    id: 5,
    members: [],
    open: false,
    programmedMembers: [2, 3],
    type: "reunion",
  },
  {
    id: 6,
    members: [],
    open: false,
    programmedMembers: [1, 2, 3],
    type: "call",
  },
];

//unconditional join
const join = (room, userId, socketId) => {
  //check if user already joined this videoroom
  console.log("room", room);
  user = room.members.find((member) => member.id == userId);
  if (user) return { joined: false, alreadyJoined: true };
  if (isParticipant(userId, room))
    room.members.push({ id: userId, socketId: socketId });
  return {
    joined: true,
    members: room.members,
    open: room.open,
    type: room.type,
    participant: isParticipant(userId, room),
    programmedMembers: room.programmedMembers,
  };
};

const isParticipant = (userId, room) => {
  if (room.open && (room.type === "call" || room.type === "reunion"))
    return true;
  if (room.type === "debate" || room.type === "conference")
    return room.programmedMembers.findIndex((u) => u.id == userId) >= 0;
  if (room.type === "call" || room.type === "reunion")
    return room.programmedMembers.findIndex((u) => u.id == userId) >= 0;
  return false;
};
//create a new room
const Room = (roomId) => {};

//join with verification
const joinRoomIfAuthorised = (userId, socketId, roomId) => {
  room = findRoom(roomId);
  //if(!room)return {joined: false, notExists: true}
  if (room.open) {
    return join(room, userId, socketId);
  } else if (room.programmedMembers.indexOf(userId) >= 0) {
    return join(room, userId, socketId);
  }
};

//quitter la videoroom
const leaveRoom = (userId, roomId) => {};

//rechercher la videoroom
const findRoom = (roomId) => {
  return rooms.find((room) => room.id == roomId);
};
module.exports = { joinRoomIfAuthorised };
