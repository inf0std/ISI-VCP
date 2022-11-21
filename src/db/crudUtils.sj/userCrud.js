const { default: mongoose } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

const User = require('../models/User');


const Reunion = require('../models/Reunion');


  // read all Users
   const readUser= async(req,res,next)=>{
    

    try {
  const ListUsers = await User.find({})
  .populate('conversations')
  .populate('reunions')
  
  .exec();//trouver tout les Users les {} bien vide
 
  res.send(ListUsers);
  console.log('userlistenvoyer');
  } catch (e) {
      res.status(500).send(e);//aficher erreur 500 objet non trouver 
      console.log('listUsers error')
    }
  
  };



// read one login
const readoneUser= async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log(id);
    
      const user = await User.findById(id)
      .populate('conversations')
      .populate('reunions')
      
      .exec();//trouver tout les Users les {} bien vide
     ;
      console.log(user);


      if (!user) {
        throw createError(404, 'user does not exist.');
      }
      res.send(user);
    } 
    catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
          next(createError(400, 'Invalid user id'));
          return;
        }
        next(error);
      }
  };
  

//update Username
const updateUsername = async (req, res, next) => {
 await User.findOneAndUpdate({_Id : req.params.id}, 
        {$set : { username: req.body.username}}, 
        {new : true}, (err, updatedObj) => {
            if (err) {
                res.status(422).json({status : false, error : "Item not updated"}); 
            }
            else {
                res.send({ updatedObj }); 
            }
        })
  };


//delette User
 const deleteUser  = async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await User.findByIdAndDelete(id);
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
  };
  
//updateUser
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const updates = req.body;
    console.log(updates);
    const options = { new: true };
    console.log(options);

    const result = await User.findByIdAndUpdate(id, updates, options);
    console.log(result);
    res.send(result);
    if (!result) {
      throw createError(404, 'User does not exist');
    }
    
  }  catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};


module.exports = { readUser,readoneUser,updateUsername ,deleteUser,updateUser};
