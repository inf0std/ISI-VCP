const { default: mongoose } = require("mongoose");
var express = require("express");
const validator = require("validator");

const createError = require("http-errors");
const { User } = require("../db/schema/User");
const Conversation = require("../db/schema/Conversation");
const { createUser } = require("./signinsignup");

const { readoneUser, auth } = require("../db/crudUtils/userCrud");
const { updatepasse, updateemail } = require("../db/crudUtils/userCrud");

const handleLogin = (req, res, next) => {
  console.log("Login attempt");
  const { email, password } = req.body;
  auth(email, password)
    .then((user) => {
      req.session.user = user;
      res.status(200).json(user.login);
    })
    .catch((err) => {
      res.json({
        message: "ERROR",
      });
    });
  // next();
};
const handlesession = (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("vous n ete pas connecter");
  }
  return res.status(200).json("welcome");
};

const destroysession = (req, res) => {
  req.session.destroy();

  return res.status(200).json("disconnected");
};

/*const handleSignUp = (req, res, next) => {
  const { email, password } = req.body;
  createUser(email, password)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.json({
        message: "ERROR",
      });
    });
  next();
};*/

const handleUserConversations = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const conv = await User.findById(id).select("conversations");
  if (conv) {
    console.log(conv);
    res.status(200).json(conv);
  } else {
    console.log(err);
    res.json({
      message: "ERROR",
    });
  }
};
const handleUserContacts = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const con = await User.findById(id).select("contacts");
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
  const con = await User.findById(id).select("reunions");
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
/*
const handleuserorganisations = function (req, res, next) {
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
};*/
/*
const handleuserreunion = function (req, res, next) {
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
  next();
};*/
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

/*
const handleconvesationmsg = function (req, res, next) {
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
  next();
};*/

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

/*
const handleconversation = function (req, res, next) {
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
};*/

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

/*

const handleupdatepasse = function (req, res, next) {
  const newpasse = req.body;
  const id = req.params.id;
  try {
    const resultat = updatepasse(id, newpasse);
    console.log(resultat);
    if (!resultat) {
      res.json("not updated");
    } else {
      res.status(200).json("updated");
    }
  } catch (err) {}
  next();
};*/
/*
const handleupdatemail = function (req, res, next) {
  const newemail = req.body.newemail;
  const id = req.params.id;
  try {
    updateemail(id, newemail);

    res.status(200).json("updated");
  } catch (err) {
    res.json("not updated");
  }
  next();
};*/

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

const handlevalidateemail = function (req, res, next) {
  const token = req.query.token;
  User.updateOne(
    { emailtoken: token },
    { emailtoken: null, isverified: true }
  ).then((user) => {
    return console.log({
      message: `${user.modifiedCount} updated successfully!`,
    });
  });
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
  next();
};

module.exports = {
  handleLogin,
  handlesession,
  destroysession,
  handleUserConversations,
  handleUserContacts,
  handleconvesationmsg,
  handleuserorganisations,
  handleuserreunion,
  handleuserconference,
  handlevalidateemail,
  handleupdatepasse,
  handleupdatemail,
  handleUpdateUser,
};
