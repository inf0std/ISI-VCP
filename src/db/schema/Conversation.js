const { default: mongoose } = require('mongoose');
const { text } = require('stream/consumers');
const validator = require('validator');
const User = require('./User')
const Schema = mongoose.Schema;


const ConversationSchema = new Schema({

         conversationName:{
         type:String, 
         trim: true,//enlever les espace
         default:'conversation_name'
         }, 

        isGroup: { type: Boolean, default: false },
        groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        users:[
            {type: mongoose.SchemaTypes.ObjectID,
                ref:"User",} ],// one  to many (one reunion to many participants)
        
         messages:
        
        [ 
       { type:String, 
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String,},
        datesent: {
            type:Date,
            default:() => Date.now(),
            immutable:true},//cant change the value of creationdate
      } ],


      





   archive:{type:Boolean,default:false}     
    
},
{ timestamps: true },

);


module.exports = mongoose.model('Conversation',ConversationSchema);
