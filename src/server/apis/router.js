var express = require("express");
const { User } = require("../db/schema/User");
const {
  createUser,
  readoneUser,
  auth,
  readcontacts,
} = require("../db/crudUtils/userCrud");
const mongoose = require("mongoose");
const router = express.Router();
const { loginrequired } = require("../db/crudUtils/config/JWT");
const { verifiedemail } = require("../db/crudUtils/config/JWT");

const {
  handleLogin,
  handleSignUp,
  handleUserConversations,
  handleUserContacts,
} = require("./userRouteHandlers");

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
router.post("/signup", handleSignUp);

router.get("/ver", function (req, res) {
  const token = req.query.token;
  User.updateOne(
    { emailtoken: token },
    { emailtoken: null, isverified: true }
  ).then((user) => {
    return console.log({
      message: `${user.modifiedCount} updated successfully!`,
    });
  });
});

router.get("/users/:id/contacts", handleUserContacts);
//////////////////////////
router.get("/users/:id/conversations", handleUserConversations);

/////////////////
router.get("/users/:id/conferences", function (req, res) {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
    .select("conferences")
    .then((conferences) => {
      console.log(conferences);
      res.status(200).json(conferences);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
});
///////////
/////////////////
router.get("/users/:id/reunions", function (req, res) {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
    .select("reunions")
    .then((reunions) => {
      console.log(reunions);
      res.status(200).json(reunions);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
});
///////////organisations
/////////////////
router.get("/users/:id/organisations", function (req, res) {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
    .select("organisations")
    .then((organisations) => {
      console.log(organisations);
      res.status(200).json(organisations);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
});

/////////////////
router.get("/conversation/:id/", function (req, res) {
  const id = req.params.id;
  console.log(id);
  readConversation(id)
    .then((Conversation) => {
      console.log(Conversation);
      res.status(200).json(Conversation);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
});
/////////////////
router.get("/conversation/:id/messages", function (req, res) {
  const id = req.params.id;
  console.log(id);
  readallMessages(id)
    .then((Messages) => {
      console.log(Messages);
      res.status(200).json(Messages);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
});
/////////////////
router.get("/conversation/:id/messages", function (req, res) {
  const id = req.params.id;
  console.log(id);
  readallMessages(id)
    .then((Messages) => {
      console.log(Messages);
      res.status(200).json(Messages);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
});

router.post(
  "/readoneUser",
  function (req, res) {
    //profile
    res.send("");
  },
  readoneUser
);
router.post("/connection", function (req, res) {
  //profile
  res.send("");
});
router.post("/subscribe", function (req, res) {
  //profile
  res.send("");
});
router.get("/user/conversation", function (req, res) {
  //profile
  res.send("");
});
router.get("/user/notification", function (req, res) {
  //profile
  res.send("");
});
router.get("/user/contact", function (req, res) {
  //profile
  res.send("");
});
router.get("/conversation", function (req, res) {
  //profile
  res.send("");
});
router.get("/user/suggestion", function (req, res) {});

router.post("/user/program");
router.get;

module.exports = router;

//createUser('test@test.com', 'test123456');
//auth('test@test.com', 'test123456');
//createUser('test@test.com', 'test123456');
