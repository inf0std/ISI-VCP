const { connectDb } = require("../db.js");

const {
  createUser,
  readoneUser,
  UpdateLogin,
  UpdateUser,
  archiveUser,
  deleteUser,
  addContact,
  auth,
} = require("./userCrud");

const {
  addConversation,
  readConversation,
  addMessage,
  readallMessages,
} = require("./conversationCrud");
var user1;
var user2;
/*
createUser("f@g.com", "12345678");

createUser("g@g.com", "12345678");
//*/

/*
auth("f@g.com", "12345678").then((user) => {
  user1 = user;
  console.log("this is user 1", user);
});

auth("g@g.com", "12345678").then((user) => {
  user2 = user;
  console.log("this is user 2", user);
}); //*/
//*
var id1 = "638b5661aa58fce157c6b6bb";
var id2 = "638b5662aa58fce157c6b6bd";
//addContact(id1, id2);

//addContact(id2, id1);

addConversation(id1, id2);
//*/
