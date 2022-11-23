const { default: mongoose } = require('mongoose');
const validator = require('validator');
const Conversation= require('./Conversation')
const Reunion= require('./Reunion')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    username:{
        default:'user_seen',
        type:String,
        trim: true,//enlever les espace 
    
    },
    pic: {
        type: "String",
       
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    login:{  
        
        email: {type:String, required:true, trim: true,//enlever les espace 
       unique:true,  lowercase:true, minLenght:8,
       validatore(v){
           if(!validator.isEmail(v)) throw new Error('email non valide');//format email
            }},
   password:{
        type:String,
         required:true,//require true pour que le champs soit obligatoire   
      
   validatore(v){
       if(!validator.isLength(v,{min :5,max: 20})) throw new Error('mot de passe doit etre entre 5 et 20 charactere');
      }
   },},
    conversations : [
            {type: mongoose.SchemaTypes.ObjectID,
             ref:"Conversation",} 
             ,],

     reunions : [
            {type: mongoose.SchemaTypes.ObjectID,
            ref:"Reunion",} 
             ,],
    
     conferences : [
                {type: mongoose.SchemaTypes.ObjectID,
                ref:"Conferences",} 
                 ,],

      isadmin:{type:Boolean,default:false,required: true,},       
    contacts:[  {type: mongoose.SchemaTypes.ObjectID,
        ref:"User",} ],
        lastseen:{type:Number}
        ,
        archive:{type:Boolean,default:false}
   
},
{timestamps: true,}//date of creation and date of update

);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  userSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;



