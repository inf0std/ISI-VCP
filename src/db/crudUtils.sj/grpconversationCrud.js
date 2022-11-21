const { default: mongoose } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const asyncHandler = require("express-async-handler");
const User = require('../models/User');

const Conversation = require('../models/Conversation');


const createGrpConversation = asyncHandler(async (req, res) => {
    //if (!req.body.users || !req.body.name) {
    //  return res.status(400).send({ message: "Please Fill all the feilds" });
   // }
    var IdU= req.params.idU;
    //var users = JSON.parse(req.body.users);//faut ajoutter les token
    var users = (req.body.users);
    var grpname=req.body.grpname;
    console.log(users);
    console.log(IdU)

      if (!users || !grpname) {
     return res.status(400).send({ message: "Please Fill all the feilds" });
      }


    if (users.length < 2) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group Conversation");
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
  
      res.status(200).json(fullGrpConversation);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });






  const renameGrp = asyncHandler(async (req, res) => {
    const IdC = req.body.IdC;
    const grpname=req.body.ConversationName;

  console.log( grpname);

    const updateConversation = await Conversation.findOneAndUpdate( {_id:IdC},
   {   $set: {ConversationName: grpname, }},{ new: true,  })
   
    if (!updateConversation ) {
      res.status(404);
      throw new Error("Convesation Not Found");
    } else {
      res.send(updateConversation);
    }
  });

  const removeFromGroup = asyncHandler(async (req, res) => {
    const { IdC, IdU } = req.body;
  
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
      .populate("users", "-login_id")
      .populate("groupAdmin");
  
    if (!removed) {
      res.status(404);
      throw new Error("conversation Not Found");
    } else {
      res.json(removed);
    }
  });


  const addToGroup = asyncHandler(async (req, res) => {
    const { IdC, IdU } = req.body;
  
    // check if the requester is admin
   // var currentConversation = await Conversation.findOneAndUpdate({_id: idC}, {$push: {messages: newMessage}});
   const added = await Conversation.findByIdAndUpdate(
    IdC,
    {
      $push: { users: IdU },
    },
    {
      new: true,
    }
  )
    //  .populate("users", "-login_id")
    //  .populate("groupAdmin");
  
    if (!added) {
      res.status(404);
      throw new Error("conversation Not Found");
    } else {
      res.json(added);
    }
  });


  module.exports = {
    createGrpConversation ,renameGrp,removeFromGroup,addToGroup}