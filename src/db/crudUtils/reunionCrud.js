const { default: mongoose } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

const User = require('../schema/User');

const Reunion = require('../schema/Conversation');

/////methode post
const createReunion =  async(id,newreunion)=>{

    
    const newreunion= new Reunion({
     
        Reunion_Name: newReunion_Name,
        ParticipantsName:newParticipantsName,
        Date_begin:newDate_begin,
        Duration:newDuration,

    });
    console.log(newReunion_Name)
 
    
    try {
      //attendre reunion soit sauvgarder then update user
  const savereunion = await reunion.save().then((reunionsaved) => {
    console.log("reunionsaved: ",reunionsaved);
    const reunionsId = reunionsaved._id;
    return User.findByIdAndUpdate(idU,{reunions_id:reunionsId});
    User.updateMany({age:{$gte:5}}, 
      {name:"ABCD"}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Updated Docs : ", docs);
      }
  });
  });
console.log(savereunion);
   
  } catch (e) {
    console.log(e)
     
    }
  
  }
  ;


  // read all users
   const readReunion= async(req,res,next)=>{
    

    try {
  const ListReunions = await Reunion.find({}).populate(User);//trouver tout les users les {} bien vide
  res.send(ListReunions);
   
  } catch (e) {
      res.status(500).send(e);//aficher erreur 500 objet non trouver 
    }
  
  };




  const readoneReunion= async (req, res, next) => {
    try {
      const id = req.params.idR;
      console.log(id);
    
      const login = await Login.findById(id);
      console.log(login);


      if (!login) {
        throw createError(404, 'login does not exist.');
      }
      res.send(login);
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

  

//update login
  const updateReunion = async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log(id);
      const updates = req.body;
      console.log(updates);
      const options = { new: true };
      console.log(options);

      const result = await Login.findByIdAndUpdate(id, updates, options);
      console.log(result);
      if (!result) {
        throw createError(404, 'login does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid login Id'));
      }

      next(error);
    }
  };

//delette login
 const deleteReunion  = async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Login.findByIdAndDelete(id);
      console.log(result);
      if (!result) {
        throw createError(404, 'Product does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Product id'));
        return;
      }
      next(error);
    }
  }














  


module.exports = {createReunion, readReunion,readoneReunion,updateReunion,deleteReunion};
