const room = (roomId, userId, socket) => {
  const [users, moderated, moderater] = [[], false, null];
  getRoomData(roomId, userId).then((data) => {
    if (data.unautorized) {
      return;
    }
    users = data.users;
    moderated = data.moderated;
    moderater = data.moderater;
  });

  joinVideoRoom(roomId, userId, socket);
};

const getRoomData = async (roomId, userId) => {
  return await fetch(
    `http://127.0.0.1:8080/api/videoRoom/${roomId}/${userId}`
  ).then((response) => response.json());
};

const joinVideoRoom = (roomId, userId, socket) => {
  socket.emit("join-video-room", {
    roomId,
    userId,
  });
};
