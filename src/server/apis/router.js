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
} = require("./ConferenceRouteHandlers");
const {
  handleupdatemail,
  handleupdatepasse,
  handleLogin,

  handleUserConversations,
  handleUserContacts,
  handleconvesationmsg,
  handleconversation,
  handleuserreunion,
  handleuserconference,
  handleuserorganisations,
  handlevalidateemail,
  handleUpdateUser,
} = require("./userRouteHandlers");

const { registerUser, allUsers } = require("./signinsignup");
const {
  handleCreateReunion,
  handleReunion,
  handleUpdateReunion,
  handleDeleteReunion,
  handleDeleteReunionAll,
} = require("./ReunionRouteHandlers");

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
router.get("/users/:id/contacts", handleUserContacts);
router.get("/users/:id/conversations", handleUserConversations);
router.get("/users/:id/conferences", handleuserconference);
router.get("/users/:id/reunions", handleuserreunion);
router.get("/users/:id/organisations", handleuserorganisations);
router.get("/conversation/:id/", handleconversation);
router.get("/conversation/:id/messages", handleconvesationmsg);
/////////////////
router.post("/user/:id/update", handleUpdateUser);
router.post("/user/:id/updatepasse", handleupdatepasse);
router.post("/user/:id/updateemail", handleupdatemail);
router.post("/user/:id1/deletecontact/:id2", deletecontact);
router.post("/user/:id1/contact/:id2", addContact);

//Conferences
router.post("/users/:idU/createConference", handleCreateConference);
router.post("/conferences/readConferenceAll", handleConference);
router.post("/conferences/:id/updateConference", handleUpdateConference);
router.post("/conferences/:id/deleteConference", handleDeleteConference);
router.post("/conferences/deleteConferenceAll", handleDeleteConferenceAll);

//Reunions
router.post("/users/:idU/createReunion", handleCreateReunion);
router.post("/reunions/readReunionAll", handleReunion);
router.post("/reunions/:id/updateReunion", handleUpdateReunion);
router.post("/reunions/:id/deleteReunion", handleDeleteReunion);
router.post("/reunions/deleteReunionAll", handleDeleteReunionAll);

router.get("/user/notification", function (req, res) {
  //profile
  res.send("");
});

router.get("/conversation", function (req, res) {
  //profile
  res.send("");
});

router.post("/user/program");

module.exports = router;

//createUser('test@test.com', 'test123456');
//auth('test@test.com', 'test123456');
//createUser('test@test.com', 'test123456');
