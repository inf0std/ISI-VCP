const users = require("./users");
const { Conversation } = require("./conversation");

let currentConvs = [];

const joinConv = (user, convId) => {
  var conv = findConv(convId);
  if (!conv) {
    conv = loadConvFromDb(convId);
    currentConvs[convId] = conv;
  }
  conv.addUser(user);
};

const leaveConv = (user, convId) => {};

const loadConvFromDb = (convId) => {
  //empty for now
};

const findConv = async (id) => {
  return currentConvs[id] ? currentConvs[id] : null;
};

const saveConvIntoDB = (conv) => {
  //empty for now
};

const createConv = (config) => {
  const { nameConv, creatorId, usersId, idConv, moderator } = config;
  var conv = new Conversation(config);
  try {
    //DB is not ready yet
    //saveConvIntoDB(conv);
  } catch (err) {
    console.log(err);
  }
  currentConvs[idConv] = conv;
};
//test de createConv
createConv({ nameConv: "isi", idConv: 1, usersId: [1, 2, 3] });

const getConversationUsers = (id) => {};

module.exports = {
  createConv,
  getConversationUsers,
  findConv,
};
