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
    readallcalls,
  updateconversation,
  removeFromGroup,
  addToGroup,
  addcall,
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

//updateconversation('638b6465d154f6f38ad37c0f',{ conversationName:'name'})

//createGrpConversation('63833e244a54dc8fa453b3ec',['63828f04629963f37bfc932c','63828f04629963f37bfc932e'])
/*
var idC="639102161922627d9a860e0c";
var call={
  senderId:"63828f04629963f37bfc9332",
  participants:"63828f04629963f37bfc932c",
  datebegin:11,
  duration:1,
}
addcall(idC,call)*/
readallcalls('639102161922627d9a860e0c')
//*/
