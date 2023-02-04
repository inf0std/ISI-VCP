const User = require("./user");
let users = [];

const addUser = (id, username) => {
  users.push(new User(id, username));
};

const removeUser = (id) => {
  users = users.filter((u) => {
    return u.getUserId() != id;
  });
};

const getUser = (id) => users.find((user) => user.id === id);

module.exports = { addUser, removeUser, getUser };
