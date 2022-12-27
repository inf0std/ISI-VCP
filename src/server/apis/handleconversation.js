const { default: mongoose } = require("mongoose");
var express = require("express");
const validator = require("validator");

const createError = require("http-errors");
const { User } = require("../db/schema/User");
const Conversation = require("../db/schema/Conversation");
const asyncHandler = require("express-async-handler");

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
  addcall,
  readallcalls,
} = require("../db/crudUtils/conversationCrud");

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
  } else {
    var ConversationData = {
      conversationName: name,
      isGroup: false,
      archive: false,
      users: [id1, id2],
    };

    try {
      await Conversation.create(ConversationData).then(
        (createdConversation) => {
          //enregistrer id de la conversation dans user.convesations
          User.updateMany(
            { $or: [{ _id: id1 }, { _id: id2 }] },

            { conversations: createdConversation._id },
            function (err) {
              if (err) {
                throw new Error(error.message);
              } else {
                console.log("user updated");
              }
            }
          );
        }
      );
      const FullConversation = await Conversation.findOne({
        _id: createdConversation._id,
      }).populate("users", "-login.password");
      res.status(200).json(FullConversation);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

module.exports = {
  handleconversation,
  handlecreateconversation,
  accessConversation,
};
