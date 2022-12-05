const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../schema/User");
const Conversation = require("../schema/Conversation");

//ajouter l'id de la conversation a la liste des converstions des utilisateurs
const addConversationToUsers = (convId, usersId) => {
  return User.updateMany(
    {
      $or: usersId.map((id) => {
        return { _id: id };
      }),
    },
    { conversations: convId }
  ).catch((err) => {
    throw err;
  });
};

const createConversation = (convData) => {
  Conversation.create(convData)
    .then((createdConversation) => {
      return addConversationToUsers(createdConversation.id, convData.users);
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const addConversation = async (id1, id2) => {
  //if the userExist
  User.findById(id1).catch((err) => {
    throw err;
  });
  User.findById(id2).catch((err) => {
    throw err;
  });

  Conversation.find({
    isGroup: false,
    archive: false,
    $and: [
      { users: { $elemMatch: { $eq: id1 } } },
      { users: { $elemMatch: { $eq: id2 } } },
    ],
  })
    .populate({ path: "users", select: "_id" })
    .then((result) => {
      if (result.length == 0) {
        createConversation({
          ConversationName: "",
          isGroup: false,
          users: [id1, id2],
        });
      }
    });
};

//read convesation
const readConversation = async (id1, id2) => {
  try {
    const FullConversation = await Conversation.findOne({
      _id: createdConversation._id,
    });
    console.log(FullConversation);
  } catch (error) {
    console.log("convesation not exist");
    throw new Error(error.message);
  }
};
//////////////////envoyer un mesage ////////////////////////////

const addMessage = async (idC, msg) => {
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

      console.log(currentConversation);
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

const readallMessages = async (idC) => {
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
const readNthTeenMessages = async (id, n) => {
  var msgs = null;
  Conversation.getById(id)
    .select("messages")
    .exec()
    .then((msgs) => {
      return msgs.slice(msgs.length - n * 10 - 10, msgs.length - n * 10);
    });
};

module.exports = {
  readNthTeenMessages,
  addConversation,
  readConversation,
  addMessage,
  readallMessages,
};
