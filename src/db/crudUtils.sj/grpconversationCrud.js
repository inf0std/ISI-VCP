const { default: mongoose } = require('mongoose');

const bcrypt = require('bcrypt');
const createError = require('http-errors');

const User = require('../models/User');

const Conversation = require('../models/Conversation');


const createGrpConversation =async (IdU, users) => {
  
    console.log(IdU)

      if (!users || !IdU) {
     return res.status(400).send({ message: "Please Fill all the feilds" });
      }


    if (users.length < 2) {
      return console.log("More than 2 users are required to form a group Conversation");
    }
  
   // users.push(req.user);//ajouter user actuelle a la liste des usersgrp
   users.push(IdU);
   console.log(users);
    try {
      const grpConversation = await Conversation.create({
        ConversationName: grpname,//nom du grope from body
        users: users,// liste of users deja creer
        isGroup: true,// boolean to true
        groupAdmin: IdU,           //req.user,// user actuel sera admin du grop
      });
  
      const fullGrpConversation = await Conversation.findOne({ _id: grpConversation._id })
      .populate("users")//.populate("users", "-password")
        .populate("groupAdmin");
  
      console.log(fullGrpConversation);
    } catch (error) {
    console.log('error')
      throw new Error(error.message);
    }
  };

  const updateconversation= async (IdC, updates) => {
 
  console.log( updates);

    const updatedConversation = await Conversation.findOneAndUpdate( {_id:IdC},
   {  updates},{ new: true,  })
   
    if (!updatedConversation  ) {
      
      throw new Error("Convesation Not Found");
    } else {
      console.log(updatedConversation );
    }
  };

  const removeFromGroup = async (IdC, IdU ) => {
   
    // check if the requester is admin
  
    const removed = await Conversation.findByIdAndUpdate(
      IdC,
      {
        $pull: { users: IdU  },
      },
      {
        new: true,
      }
    )
      .populate("users", "-login")
      .populate("groupAdmin");
  
    if (!removed) {
     console.log('not removed')
      throw new Error("conversation Not Found");
    } else {
     console.log(removed);
    }
  };


  const addToGroup =async ( IdC, IdU) => {

   const added = await Conversation.findByIdAndUpdate(
    IdC,
    {
      $push: { users: IdU },
    },
    {
      new: true,
    }
  )

    if (!added) {
     console.log('not added')
      throw new Error("conversation Not Found");
    } else {
      console.log(' added')
    }
  };


  module.exports = {
    createGrpConversation , updateconversation,removeFromGroup,addToGroup}