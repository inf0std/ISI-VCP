const { default: mongoose } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const asyncHandler = require("express-async-handler");
const User = require('../models/User');

const Conversation = require('../models/Conversation');


const accessConversation = asyncHandler(async (req, res) => {
    var userId  = req.body.userId;//recuperer id destinataire
   var idU = req.body.idU;// id user
    
   console.log(userId);console.log(idU)
    var isConversation = await Conversation.find({
        isGroup: false,
        $and: [
          { users: { $elemMatch: { $eq: idU} } }, 
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
       .populate("users") //recuperer tout les info de user
       //.populate("messages.sender")
        

      /*isConversation = await User.populate(isConversation, {
            path: "messages.sender",
            select: "username",
          });*/
          console.log(isConversation)
   
        const  dest = await User.findById(userId).select('username') ;
          console.log(dest)



      if (isConversation.length > 0) {
    res.send(isConversation[0]);//si la convesation length >0 donc il exist deja alors la recuperer directement
      } 


      else {
    var ConversationData = {
        ConversationName: dest.username,
        isGroup: false,
        users: [idU, userId],
    }; 



    try {
        const createdConversation = await Conversation.create(ConversationData).then(
          (createdConversation ) => {
           
            //const Conversationid=createdConversation._id;
           // console.log(Conversationid)


           //enregistrer id de la conversation dans user.convesations
            return User.updateMany({   $or:[{_id:userId},{_id:idU} ]    }, 
                { conversations:createdConversation._id}, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated User");
                }
            });
          });

          //afichage de la convesation creer avc users asoosier
        const FullConversation  = await Conversation.findOne({ _id: createdConversation._id })
        res.status(200).json(FullConversation );
      } 
      catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }   



});



//////////////////envoyer un mesage ////////////////////////////



const sendMessage = asyncHandler(async (req, res) => {
    const idU = req.params.idU;// id user
    const idC = req.params.idC;// id conversation
    const  content = req.body.content;// le contenue du message
console.log(content)
    // verifier si le message est vide ou id de la convesation est vide
    if (!content || !idC) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    var newMessage = {
      sender: idU,
      content: content,
     
    };
  
    try {
     
      // var currentConversation= await Conversation.findById(idC);
      var currentConversation = await Conversation.findOneAndUpdate({_id: idC}, {$push: {messages: newMessage}},{isadmin:false});
       //currentConversation.messages=newMessage;
       //await currentConversation.messages.save(newMessage);
 
       res.json(currentConversation);
     } catch (error) {
       res.status(400);
      
     }
   });




  const allMessages= async (req, res, next) => {
    try {
      const idC = req.params.idC;
      console.log(idC);
    
      const messages = await Conversation.findById(idC)
      .select('messages')
      console.log(messages);


      if (!messages) {
        throw createError(404, 'login does not exist.');
      }
      res.send(messages);
    } 
    catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
          next(createError(400, 'Invalid login id'));
          return;
        }
        next(error);
      }
  };

  const teenMessages= async (req, res, next) => {
    try {
      const idC = req.params.idC;
      console.log(idC);
    
      const messages = await Conversation.findById(idC)
      .select('messages').then((messagessaved) => {
       var teenM= messagessaved.limit(2)//$sort $limit $lookup $skip $match
      });
      console.log(teenM);


      if (!messages) {
        throw createError(404, 'no messages');
      }
      res.send(messages);
    } 
    catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
          next(createError(400, 'Invalid convesation id'));
          return;
        }
        next(error);
      }
  };


 









/*

 const allMessages = asyncHandler(async (req, res) => {
 
  try {
     //const idU = req.body.idU;// id user
  const idC = req.body.idC;// id conversation

  //console.log(idU)
  console.log(idC)
    const messages = await Conversation.find(idC)
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.messages);
  }
});
*/

//.select('ConversationName','messages')
    //  .populate("sender", "username").exec()
      



module.exports = {
    accessConversation,sendMessage,allMessages,teenMessages}