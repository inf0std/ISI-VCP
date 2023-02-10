const createError = require("http-errors");
const { User } = require("../db/schema/User");
const Conversation = require("../db/schema/Conversation");
const { genLoginToken, genEmailToken } = require("./tokens");
const jwt = require("jsonwebtoken");
const { auth } = require("../db/crudUtils/userCrud");

const handleLogin = (req, res) => {
  console.log("Login attempt");
  const { email, password } = req.body;
  auth(email, password)
    .then((user) => {
      let token = genLoginToken(user._id);
      req.session.id = user._id;
      res.cookie("id", user._id);
      res.status(200).json({
        _id: user._id,
        name: user.username,
        token: token,
      });
    })
    .catch((err) => {
      res.json({
        message: "ERROR",
      });
    });
};

const handleUserConversations = async (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .select("conversations")
    .then((convs) => {
      console.log(convs);
      res.status(200).json(convs);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({
        error: "conv not exists",
      });
    });
};

const handleUserContacts = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
    .select("contacts")
    .then((cons) => {
      console.log(cons);
      res.status(200).json(cons);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({
        error: "con not exists",
      });
    });
};

const handleuserorganisations = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const con = await User.findById(id).select("organisations");
  if (con) {
    console.log(con);
    res.status(200).json(con);
  } else {
    console.log(err);
    res.json({
      message: "ERROR",
    });
  }
};
const handleuserreunion = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
    .select("reunions")
    .then((reunions) => {
      console.log(con);
      res.status(200).json(con);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).status({
        message: "ERROR",
      });
    });
};

const handleSearchPeople = (req, res) => {
  const id = req.params.id;
  const query = req.query.query;

  User.find({ username: { $regex: RegExp(`^.*${query}.*$`, "i") } }).toArray(
    (arr) => {}
  );
};
const handleuserconference = function (req, res, next) {
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
  next();
};

const handleconvesationmsg = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const messages = await Conversation.findById(id).select("messages");
  console.log(messages);

  if (!messages) {
    res.json({
      message: "ERROR",
    });
  } else {
    res.status(200).json(messages);
  }
};

const handleupdatepasse = async function (req, res, next) {
  const newpasse = req.body.newpasse;
  const id = req.params.id;
  console.log(newpasse);
  if (!newpasse || !id) {
    return console.log({
      message: "Data to update can not be empty!",
    });
  }
  try {
    const data = await User.findById(id);

    if (!data) {
      console.log({
        message: `Cannot update Conference with id=${id}. Maybe Conference does not exist!`,
      });
    } else {
      data.login.passe = newpasse;
      data.save();
      res.json("updated");
      console.log({ message: "passeword was updated successfully." });
    }
  } catch (err) {
    res.json("not updated");
    console.log({
      message: "Error updating passeword with id = " + id,
    });
  }

  next();
};

const handleupdatemail = async function (req, res, next) {
  const newemail = req.body;
  const id = req.params.id;

  console.log(newemail);
  if (!newemail || !id) {
    return console.log({
      message: "Data to update can not be empty!",
    });
  }

  try {
    const resultat = User.findByIdAndUpdate(
      id,
      { "login.email": newemail },
      { new: true }
    );

    if (!resultat) {
      res.json("not updated");
    }

    res.status(200).json("updated");
  } catch (error) {
    res.json("not updated");
    console.log(error.message);
    throw error;
  }
  next();
};

const handleUpdateUser = async function (req, res, next) {
  const newUser = req.body;
  const id = req.params.id;
  if (!newUser || !id) {
    return createError(404, "veuilleur saisir data");
  }
  const newuser = newUser;
  try {
    const result = await User.findByIdAndUpdate(id, newuser, { new: true });
    console.log(result);
    if (!result) {
      res.json("user not update");
    }
    res.status(200).json("updated");
    console.log(result);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const handleGetData = (req, res) => {
  let id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(404).send({ error: "user not exists" });
    });
};

handleGetConversation = (req, res) => {
  let id = req.params.id;
  let convId = req.params.convId;
  Conversation.findOne({ _id: convId, users: id })
    .then((conv) => {
      res.status(200).json(conv);
    })
    .catch((err) => {
      res.status(404).send({ error: "conversation not exist" });
    });
};
module.exports = {
  handleGetData,
  handleLogin,
  handleUserConversations,
  handleUserContacts,
  handleconvesationmsg,
  handleuserorganisations,
  handleuserreunion,
  handleuserconference,
  handleupdatepasse,
  handleupdatemail,
  handleUpdateUser,
};
