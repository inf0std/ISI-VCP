const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../schema/User");
const Conversation = require("../schema/Conversation");

<<<<<<< HEAD
const {User} = require('../schema/User');
=======
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
>>>>>>> fb248c5acbf2751f4d738288cd7b9d4c68288702

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

<<<<<<< HEAD
const addConversation = async (ids, idR) => {

    
   console.log(ids);console.log(idR)

    var isConversation = await Conversation.find({
        isGroup: false,   archive :false,
        $and: [
          { users: { $elemMatch: { $eq: ids} } }, 
          { users: { $elemMatch: { $eq: idR } } },
        ],
      })
       .populate({ path: 'users', select: '_id' })
       console.log(isConversation)
        const  dest = await User.findById(idR).select("username") ;
          console.log(dest)

      if (isConversation.length > 0) {
    console.log(isConversation[0]);//si la convesation length >0 donc il exist deja alors la recuperer directement
      } 


      else {
    var ConversationData = {
      
        isGroup: false,
        users: [ids, idR],
        archive :false,
    }; 



    try {
        const createdConversation = await Conversation.create(ConversationData).then(
          (createdConversation ) => {
           //enregistrer id de la conversation dans user.convesations
            return User.updateMany({   $or:[{_id:ids},{_id:idR} ]    }, 
              
                { conversations:createdConversation._id}, function (err) {
                if (err){
                    console.log(err)
                }
                else{
                  throw new Error(error.message);
                    console.log("Updated User");
                }
            });
          });

          //afichage de la convesation creer avc users asoosier
        const FullConversation  = await Conversation.findOne({ _id: createdConversation._id })
        console.log(FullConversation );
      } 
      catch (error) {
      
        throw new Error(error.message);
      }
    }   

  

=======
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
>>>>>>> fb248c5acbf2751f4d738288cd7b9d4c68288702
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
