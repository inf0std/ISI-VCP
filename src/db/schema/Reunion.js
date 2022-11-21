const { default: mongoose } = require('mongoose');
const validator = require('validator');
const User = require('./User');
const Schema = mongoose.Schema;


const ReunionSchema = new Schema({
    Reunion_Name:{
        Type:String,
       // default:() => '1'
    },
    Reunion_Host:{type: mongoose.SchemaTypes.ObjectID,
    ref:"User",} //one to one
    ,
    Reunion_moderateur:{type: mongoose.SchemaTypes.ObjectID,
    ref:"User",} ,//one to one

     Conversation:{type: mongoose.SchemaTypes.ObjectID,
    ref:"Conversation",} ,//one to one

   ParticipantsName:[
    {type: mongoose.SchemaTypes.ObjectID,
        ref:"User",} ],// one  to many (one reunion to many participants)




   Date_begin:{Type:Date},
  
   Duration:{
    type:Number,default:40}  ,
 
},
{timestamps: true,}//date of creation and date of updat);

)

module.exports = mongoose.model('Reunion',ReunionSchema);
