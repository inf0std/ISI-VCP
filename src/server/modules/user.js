const User = (data) => {
  const { id, name, convs } = data;

  let userId = id;
  let userName = name;
  let socketIds = [];

  this.getSocketIds = () => {
    return socketIds;
  };

  this.getUserId = () => {
    return userId;
  };

  this.getUserName = () => {
    return userName;
  };

  this.addSocket = (socketid) => {
    socketIds.append(socket);
  };

  this.removeSocket = (socketid) => {
    if (socketIds.indexof(socketid) == -1) return;
    if (socketIds.indexOf(socketid) == socketIds.length - 1) {
      socketIds.pop();
      return;
    }
    socketIds[socketIds.indexOf(socketid)] = socketIds.pop();
  };
};

module.exports = User;
