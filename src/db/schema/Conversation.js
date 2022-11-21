const { default: mongoose } = require('mongoose');
const validator = require('validator');
const User = require('./User')
const Schema = mongoose.Schema;


const ConversationSchema = new Schema({

         ConversationName:{
         type:String, 
         trim: true,//enlever les espace
         }, 

        isGroup: { type: Boolean, default: false },
        groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        users:[
            {type: mongoose.SchemaTypes.ObjectID,
                ref:"User",} ],// one  to many (one reunion to many participants)
        
         messages:
        [
       { sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
       content: { type: String,},
        readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
       Datesent: {
            type:Date,
            default:() => Date.now(),
            immutable:true},//cant change the value of creationdate
      } ],


      





   archive:{type:Boolean,default:false}     
    
},
{ timestamps: true },

);


module.exports = mongoose.model('Conversation',ConversationSchema);
