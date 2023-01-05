const { default: mongoose } = require("mongoose");
var express = require("express");
const validator = require("validator");

const createError = require("http-errors");
const { User } = require("../db/schema/User");
const Conversation = require("../db/schema/Conversation");
const asyncHandler = require("express-async-handler");

/*const {
  createGrpConversation,
  readNthTeenMessages,
  addConversation,
  readConversation,
  addConversationToUsers,
} = require("../db/crudUtils/conversationCrud");*/

const handleconversation = async (req, res, next) => {
  const id = req.params.id;
  const FullConversation = await readConversation(id);
  if (FullConversation) {
    res.send(FullConversation);
  }
};

const handlecreateconversation = async (req, res, next) => {
  const id1 = req.params.id;
  const id2 = req.body.id;
  const create = await addConversation(id1, id2);
  if (create) {
    res.send("convesationscreated");
  } else {
    res.send("eror");
  }
};

const accessConversation = asyncHandler(async (req, res) => {
  const id1 = req.params.id;
  const id2 = req.body.id;
  const name = req.body.conversationName;
  console.log(id1);
  console.log(id2);
  console.log(name);
  if (!id1 || !id2) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isConversation = await Conversation.find({
    isGroup: false,
    archive: false,
    $and: [
      { users: { $elemMatch: { $eq: id1 } } },
      { users: { $elemMatch: { $eq: id2 } } },
    ],
  }).populate("users", "-login.password");

  if (isConversation.length > 0) {
    res.send(isConversation[0]);
    console.log("exist deja");
  } else {
    var ConversationData = {
      conversationName: name,
      isGroup: false,
      archive: false,
      users: [id1, id2],
    };

    try {
      const result = await Conversation.create(ConversationData);

      //enregistrer id de la conversation dans user.convesations
      if (result) {
        User.updateMany(
          { $or: [{ _id: id1 }, { _id: id2 }] },

          { conversations: result._id },
          function (err) {
            if (err) {
              throw new Error(error.message);
            } else {
              console.log("user updated");
            }
          }
        );
      }

      const FullConversation = await Conversation.findOne({
        _id: result._id,
      }).populate("users", "-login.password");
      res.status(200).json(FullConversation);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

//////////////////envoyer un mesage ////////////////////////////

const addMessage = async (req, res) => {
  idC = req.params.id;
  msg = req.body.msg;
  console.log(content);
  // verifier si le message est vide ou id de la convesation est vide
  if (!content || !idC) {
    console.log("Invalid data passed into request");
  } else {
    var newMessage = {
      type: msg.type,
      sender: msg.senderId,
      content: msg.content,
    };

    try {
      var currentConversation = await Conversation.findOneAndUpdate(
        { _id: idC },
        { $push: { messages: newMessage } }
      );

      if (currentConversation) {
        res.send(currentConversation);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

const addcall = async (req, res) => {
  const id = req.param.idC;
  const call = req.body.call;
  console.log(call);
  // verifier si le message est vide ou id de la convesation est vide
  if (!call || !idC) {
    console.log("Invalid data passed into request");
  } else {
    var newcall = {
      sender_call: call.senderId,
      participants: call.participants,
      datebegin: call.datebegin,
      duration: call.duration,
    };

    try {
      var currentConversation = await Conversation.findOneAndUpdate(
        { _id: idC },
        { $push: { videocalls: newcall } }
      );

      res.send(currentConversation);
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
const readallcalls = async (req, res) => {
  const id = req.params.idC;
  try {
    console.log(idC);

    const videocalls = await Conversation.findById(idC).select("videocalls");
    console.log(videocalls);

    if (!videocalls) {
      throw createError(404, " does not exist.");
    }
    res.send(videocalls);
  } catch (error) {
    console.log(error.message);
    res.status(400);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid id"));

      return;
    }
    next(error);
  }
};
const readallMessages = async (req, res) => {
  idC = req.params.id;
  try {
    console.log(idC);

    const messages = await Conversation.findById(idC).select("messages");
    console.log(messages);

    if (!messages) {
      throw createError(404, " does not exist.");
    }
    console.log(messages);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid id"));
      return;
    }
    next(error);
  }
};

//read messages from n*10 to (n+1)*10
const readNthTeenMessages = async (req, res) => {
  const id = req.params.id;
  const n = req.body.n;
  var msgs = null;
  Conversation.getById(id)
    .select("messages")
    .exec()
    .then((msgs) => {
      return msgs.slice(msgs.length - n * 10 - 10, msgs.length - n * 10);
    });
};

const createGrpConversation = async (req, res) => {
  const id = req.params.IdU;
  const users = req.body.users;
  console.log(IdU);

  if (!users || !IdU) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  if (users.length < 2) {
    return console.log(
      "More than 2 users are required to form a group Conversation"
    );
  }

  // users.push(req.user);//ajouter user actuelle a la liste des usersgrp
  users.push(IdU);
  console.log(users);
  try {
    const grpConversation = await Conversation.create({
      // ConversationName: grpname, //nom du grope from body
      users: users, // liste of users deja creer
      isGroup: true, // boolean to true
      groupAdmin: IdU, //req.user,// user actuel sera admin du grop
      archive: false,
    }).then((createdConversation) => {
      res.send(createdConversation);
      addConversationToUsers(createdConversation.id, createdConversation.users);
    });
  } catch (error) {
    res.send("error");
    throw new Error(error.message);
  }
};

const updateconversation = async (req, res) => {
  const IdC = req.params.id;
  const updates = re.body.updates;
  console.log(updates);
  if (!updates || !Idc) {
    throw createError(404, "veuilleur saisir data");
  }
  const updatedConversation = await Conversation.findByIdAndUpdate(
    IdC,
    updates,
    { new: true }
  );

  if (!updatedConversation) {
    throw new Error("Convesation Not Found");
  } else {
    res.send(updatedConversation);
  }
};

const removeFromGroup = async (req, res) => {
  const IdC = req.params.id;
  const IdU = req.body.id;
  // check if the requester is admin
  if (!IdU || !Idc) {
    throw createError(404, "veuilleur saisir data");
  }
  const removed = await Conversation.findByIdAndUpdate(
    IdC,
    {
      $pull: { users: IdU },
    },
    {
      new: true,
    }
  )
    .populate("users", "-login")
    .populate("groupAdmin");

  if (!removed) {
    res.send("not removed");
    throw new Error("conversation Not Found");
  } else {
    res.send(removed);
  }
};

const addToGroup = async (req, res) => {
  const IdC = req.params.id;
  const IdU = req.params.id;
  if (!IdU || !Idc) {
    throw createError(404, "veuilleur saisir data");
  }
  const added = await Conversation.findByIdAndUpdate(
    IdC,
    {
      $push: { users: IdU },
    },
    {
      new: true,
    }
  );

  if (!added) {
    res.send("not added");
    throw new Error("conversation Not Found");
  } else {
    res.send(added);
  }
};

module.exports = {
  handleconversation,
  handlecreateconversation,
  accessConversation,
  addToGroup,
  removeFromGroup,
  updateconversation,
  createGrpConversation,
  addMessage,
  readNthTeenMessages,
  readallMessages,
  readallcalls,
  addcall,
};
