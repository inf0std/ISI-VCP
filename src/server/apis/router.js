var express = require("express");
const { User } = require("../db/schema/User");

const mongoose = require("mongoose");
const router = express.Router();
const { loginrequired } = require("../db/crudUtils/config/JWT");
const { verifiedemail } = require("../db/crudUtils/config/JWT");
const { deletecontact, addContact } = require("./routeUtils");
const {
  handleCreateConference,
  handleConference,
  handleUpdateConference,
  handleDeleteConference,
  handleDeleteConferenceAll,
  handleJoinedToConference,
  handleLeaveTheConference,
} = require("./ConferenceRouteHandlers");
const {
  handleupdatemail,
  handleupdatepasse,
  handleLogin,

  handleUserConversations,
  handleUserContacts,
  handleconvesationmsg,
  handleuserreunion,
  handleuserconference,
  handleuserorganisations,
  handlevalidateemail,
  handleUpdateUser,
} = require("./userRouteHandlers");
const {
  handleconversation,
  handlecreateconversation,
  accessConversation,
  addToGroup,
  readNthTeenMessages,
  readallMessages,
  removeFromGroup,
  updateconversation,
  addcall,
} = require("./handleconversation");
const {
  handleCreateTag,
  handleTag,
  handleUpdateTag,
  handleDeleteTag,
  handleGetConfWithTag,
  handleGetReunWithTag,
  handleAddTagToConf,
  handleAddTagToReun,
} = require("./TagRouteHandlers");
const { registerUser, allUsers } = require("./signinsignup");
const {
  handleCreateReunion,
  handleReunion,
  handleUpdateReunion,
  handleDeleteReunion,
  handleDeleteReunionAll,
  handleModerateur,
  handleJoinedToReunion,
  handleLeaveTheReunion,
} = require("./ReunionRouteHandlers");
const {
  handleSetEvents,
  handleGetProgrammedEvents,
  handleGetMissedEvents,
} = require("./EventsRouteHandle");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", function (req, res) {
  //profile
  res.send("");
});
//////
//signIn
router.post("/signin", verifiedemail, handleLogin);
//signUp
router.post("/signup", registerUser);
router.get("/ver", handlevalidateemail);
router.get("/user/:id/contacts", handleUserContacts);

router.get("/user/:id/conferences", handleuserconference);
router.get("/user/:id/reunions", handleuserreunion);
router.get("/user/:id/organisations", handleuserorganisations);
router.get("/conversation/:id/", handleconversation);
router.get("/conversation/:id/messages", handleconvesationmsg);
/////////////////
router.post("/user/:id/update", handleUpdateUser);
router.post("/user/:id/updatepasse", handleupdatepasse);
router.post("/user/:id/updateemail", handleupdatemail);
router.post("/user/:id1/deletecontact/:id2", deletecontact);
router.post("/user/:id1/contact/:id2", addContact);

//Conferences
router.post("/user/:idU/createConference", handleCreateConference);
router.post("/conferences/readConferenceAll", handleConference);
router.post("/conferences/:id/updateConference", handleUpdateConference);
router.post("/conferences/:id/deleteConference", handleDeleteConference);
router.post("/conferences/deleteConferenceAll", handleDeleteConferenceAll);
router.post(
  "/conferences/:idC/user/:idU/JoinedToConference",
  handleJoinedToConference
);
router.post(
  "/conferences/:idC/user/:idU/LeaveTheConference",
  handleLeaveTheConference
);

//Reunions
router.post("/user/:idU/createReunion", handleCreateReunion);
router.post("/reunions/readReunionAll", handleReunion);
router.post("/reunions/:id/updateReunion", handleUpdateReunion);
router.post("/reunions/:id/deleteReunion", handleDeleteReunion);
router.post("/reunions/deleteReunionAll", handleDeleteReunionAll);
router.post("/reunions/:idR/users/:idM/Moderateur", handleModerateur);
router.post("/reunions/:idR/users/:idU/JoinedToReunion", handleJoinedToReunion);
router.post("/reunions/:idR/users/:idU/LeaveTheReunion", handleLeaveTheReunion);

//Tags
router.post("/tags/createTag", handleCreateTag);
router.post("/tags/readAllTags", handleTag);
router.post("/tags/:id/updateTag", handleUpdateTag);
router.post("/tags/:id/deleteTag", handleDeleteTag);
router.post("/conferences/tags/:idT/getConfWithTag", handleGetConfWithTag);
router.post("/reunions/tags/:idT/getReunWithTag", handleGetReunWithTag);
router.post("/tags/:idT/conferences/:idC/addTagToConf", handleAddTagToConf);
router.post("/tags/:idT/reunions/:idR/addTagToReun", handleAddTagToReun);

//Events
router.post("/user/SetEvent", handleSetEvents);
router.post("/user/:idU/getUserProgrammedEvents", handleGetProgrammedEvents);
router.post("/user/:idU/getUserMissedEvents", handleGetMissedEvents);

router.get("/user/notification", function (req, res) {
  //profile
  res.send("");
});
router.post("/conversation/id:", handlecreateconversation);
router.post("/conversation/id:", addToGroup);
router.get("/conversation/id:", readNthTeenMessages);
router.get("/conversation/id:", readallMessages);
router.get("/user/:id/conversations", handleUserConversations);
router.post("/user/:id/accessConversation", accessConversation);
router.post("/conversation/id:", removeFromGroup);
router.post("/conversation/id:", updateconversation);
router.post("/conversation/id:", addcall);

router.get("/conversation", function (req, res) {
  //profile
  res.send("");
});

router.post("/user/program");

module.exports = router;
