const { default: mongoose } = require('mongoose');

const bcrypt = require('bcrypt');
const createError = require('http-errors');

const User = require('../schema/User');

const Conversation = require('../schema/Conversation');


const addConversation = async (ids, idR) => {

    
   console.log(ids);console.log(idR)

    var isConversation = await Conversation.find({
        isGroup: false,
        $and: [
          { users: { $elemMatch: { $eq: ids} } }, 
          { users: { $elemMatch: { $eq: idR } } },
        ],
      })
       .populate({ path: 'users', select: '_id' }).
       console.log(isConversation)
        const  dest = await User.findById(idR).select('username') ;
          console.log(dest)

      if(!dest){console.log('destinataire introuveble')} else{

        isConversation = await User.populate(isConversation, {
          path: "messages.sender",
          select: "username pic",
        });
      if (isConversation.length > 0) {
    console.log(isConversation[0]);//si la convesation length >0 donc il exist deja alors la recuperer directement
      } 


      else {
    var ConversationData = {
        ConversationName: dest.username,
        isGroup: false,
        users: [ids, idR],
    }; 



    try {
        const createdConversation = await Conversation.create(ConversationData).then(
          (createdConversation ) => {
           //enregistrer id de la conversation dans user.convesations
            return User.updateMany({   $or:[{_id:userId},{_id:idU} ]    }, 
              
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

  }

};

//read convesation
const readConversation = async (ids, idR) => {
try{
const FullConversation  = await Conversation.findOne({ _id: createdConversation._id })
console.log(FullConversation );

}catch(error) {
      console.log('convesation not exist')
  throw new Error(error.message);
}
};
//////////////////envoyer un mesage ////////////////////////////



const addMessage = async (idC,content) => {
    
   
console.log(content)
    // verifier si le message est vide ou id de la convesation est vide
    if (!content || !idC) {
      console.log("Invalid data passed into request");
     
    }
   else{
    var newMessage = {
      sender: idU,
      content: content,
     
    };
  

     try{
      // var currentConversation= await Conversation.findById(idC);
      var currentConversation = await Conversation.findOneAndUpdate({_id: idC}, {$push: {messages: newMessage}});
       //currentConversation.messages=newMessage;
       //await currentConversation.messages.save(newMessage);
 
       console.log(currentConversation);
     } catch (error) {
      
      throw new Error(error.message);

     }}
   };




  const readallMessages= async (idC) => {
    try {
   
      console.log(idC);
    
      const messages = await Conversation.findById(idC)
      .select('messages')
      console.log(messages);


      if (!messages) {
        throw createError(404, ' does not exist.');
      }
      console.log(messages);
    } 
    catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
          next(createError(400, 'Invalid id'));
          return;
        }
        next(error);
      }
  };

  const readteenMessages= async (req, res, next) => {
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
     console.log(teenM);
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


module.exports = {
   addConversation,readConversation,addMessage ,readallMessages,readteenMessages}