const { connectDb } = require("../db.js");

/*const {
  createUser,
  readoneUser,
  UpdateLogin,
  UpdateUser,
  archiveUser,
  deleteUser,
  addContact,
  auth,
} = require("./userCrud");*/


const {
  createGrpConversation,
  readNthTeenMessages,
  addConversation,
  readConversation,
  addMessage,
  readallMessages,
    
  updateconversation,
  removeFromGroup,
  addToGroup,
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
//var id1 = "63828f04629963f37bfc9332";
//var id2 = "63828f04629963f37bfc932c";
//addContact(id1, id2);

//addContact(id2, id1);

//addConversation(id1, id2);

updateconversation('638b6465d154f6f38ad37c0f',{ conversationName:'name'})

//*/
