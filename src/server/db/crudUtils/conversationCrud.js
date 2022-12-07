const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const {User} = require("../schema/User");
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
   console.log(id1);console.log(id2)

    var isConversation = await Conversation.find({
        isGroup: false,   archive :false,
        $and: [
          { users: { $elemMatch: { $eq: id1} } }, 
          { users: { $elemMatch: { $eq: id2 } } },
        ],
      })
       .populate({ path: 'users', select: '_id' })
       console.log(isConversation)
        const  dest = await User.findById(id2).select("username") ;
          console.log(dest)

      if (isConversation.length > 0) {
    console.log(isConversation[0]);//si la convesation length >0 donc il exist deja alors la recuperer directement
      } 


      else {
    var ConversationData = {
      
        isGroup: false,
        users: [id1, id2],
        archive :false,
    }; 



    try {
        const createdConversation = await Conversation.create(ConversationData).then(
          (createdConversation ) => {
           //enregistrer id de la conversation dans user.convesations
            return User.updateMany({   $or:[{_id:id1},{_id:id2} ]    }, 
              
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

  

};

//read convesation
const readConversation = async (id2) => {
  try {
    const FullConversation = await Conversation.findOne({
      _id: id2,
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

const addcall = async (idC, call) => {
  console.log(call);
  // verifier si le message est vide ou id de la convesation est vide
  if (!call || !idC) {
    console.log("Invalid data passed into request");
  } else {
    var newcall = {
      
      sender_call: call.senderId,
      participants:call.participants,
      datebegin:call.datebegin,
      duration:call.duration
      
    };

    try {
      var currentConversation = await Conversation.findOneAndUpdate(
        { _id: idC },
        { $push: { videocalls: newcall} }
      );

      console.log(currentConversation);
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
const readallcalls = async (idC) => {
  try {
    console.log(idC);

    const videocalls = await Conversation.findById(idC).select("videocalls");
    console.log(videocalls);

    if (!videocalls) {
      throw createError(404, " does not exist.");
    }
    return videocalls;
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid id"));
      return;
    }
    next(error);
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



const createGrpConversation = async (IdU, users) => {
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
      archive:false,
    }).then((createdConversation) => {
     addConversationToUsers(createdConversation.id, createdConversation.users);
    });

  
  } catch (error) {
    console.log("error");
    throw new Error(error.message);
  }
};


const updateconversation = async (IdC, updates) => {
  console.log(updates);
  if (!updates||!Idc) {
    throw createError(404, "veuilleur saisir data");
  }
  const updatedConversation = await Conversation.findByIdAndUpdate(
  IdC ,  updates , { new: true } );

  if (!updatedConversation) {
    throw new Error("Convesation Not Found");
  } else {
    return updatedConversation
  }
};

const removeFromGroup = async (IdC, IdU) => {
  // check if the requester is admin
  if (!IdU||!Idc) {
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
    console.log("not removed");
    throw new Error("conversation Not Found");
  } else {
    return removed;
  }
};

const addToGroup = async (IdC, IdU) => {
  if (!IdU||!Idc) {
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
    console.log("not added");
    throw new Error("conversation Not Found");
  } else {
   
    return added;
  }
};
module.exports = {
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
}
