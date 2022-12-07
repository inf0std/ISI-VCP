const { default: mongoose } = require("mongoose");

const bcrypt = require("bcrypt");
const createError = require("http-errors");

const { User } = require("../schema/User");

const Conversation = require("../schema/Conversation");



const updateconversation = async (IdC, updates) => {
  console.log(updates);

  const updatedConversation = await Conversation.findOneAndUpdate(
    { _id: IdC },
    { updates },
    { new: true }
  );

  if (!updatedConversation) {
    throw new Error("Convesation Not Found");
  } else {
    console.log(updatedConversation);
  }
};

const removeFromGroup = async (IdC, IdU) => {
  // check if the requester is admin

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
    console.log("not removed");
    throw new Error("conversation Not Found");
  } else {
    console.log(removed);
  }
};

const addToGroup = async (IdC, IdU) => {
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
    console.log("not added");
    throw new Error("conversation Not Found");
  } else {
    console.log(" added");
  }
};

module.exports = {
  
  updateconversation,
  removeFromGroup,
  addToGroup,
};
