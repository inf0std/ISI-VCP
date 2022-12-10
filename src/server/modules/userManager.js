const errorCodes = require("../utils/errorCodes");
let users = [];

const User = (id, data) => {
  //identifiant de l'utilisateur comme sauvegarder dans la base de donnee
  let id = id;
  //les identifiants des differentes socket de l'utilisateur
  let socketIds = [];

  this.addSocketId = async (socketId) => {
    socketIds.push(socket);
  };

  this.getId = async () => {
    return id;
  };

  this.removeSocket = async (socketid) => {
    let index = socketIds.findIndex(socketid);
    if (index === -1) throw errorCodes.user_has_no_such_socket;
    if (index === socketIds.length - 1) socketIds.pop();
    socketIds[index] = socketIds.pop();
  };

  this.getSockets = async () => {
    return socketIds;
  };
};

const findUser = async (id) => {
  let i;
  for (i = 0; i < users.length; i++) {
    if (users[i].getId() === id) {
      return users[i];
    }
  }
  return null;
};

const addSocketToUser = async (id, socketId) => {
  findUser(id).then((user) => {
    if (user === null) {
      throw errorCodes.user_not_exists;
    }
    user.addSocketId(socket);
  });
};

const addUser = async (id, data) => {
  findUser(id).then((user) => {
    if (user) {
      throw errorCodes.user_already_exists;
    }
    users.push(User(id, data));
  });
};

const removeSocketIdFromUser = async (userId, socketId) => {
  findUser(userId).then((user) => {
    if (!user) throw errorCodes.user_not_exists;
    user.removeSocket(socketId);
  });
};

const removeUser = async (id) => {
  users = users.filter((user) => {
    return user.getId() != id;
  });
};

module.exports = {
  removeUser,
  removeSocketIdFromUser,
  addUser,
  addSocketToUser,
  findUser,
};
