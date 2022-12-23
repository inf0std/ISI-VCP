const { default: mongoose } = require("mongoose");
var express = require("express");
const validator = require("validator");

const createError = require("http-errors");
const { User } = require("../db/schema/User");
const Conversation = require("../db/schema/Conversation");

const { updatepasse, updateemail } = require("../db/crudUtils/userCrud");

const deletecontact = async function (req, res, next) {
  const id2 = req.params.id2;
  const id1 = req.params.id1;
  if (!id1 || !id2) {
    return createError(404, "veuilleur saisir data");
  }
  console.log(id1);
  console.log(id2);
  try {
    const result = await User.updateOne(
      { _id: id1 },
      { $pullAll: { contacts: [{ _id: id2 }] } },

      { new: true }
    );

    if (!result) {
      res.json("not");
    }
    res.status(200).json("ok");
    console.log(result.contacts);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
  next();
};

const readcontacts = async (id) => {
  return User.findById(id).select("contacts");
};

const addContact = async function (req, res, next) {
  (id1 = req.params.id1), (id2 = req.params.id2);
  if (!id1 || !id2) {
    throw createError(404, "veuilleur saisir data");
  }
  console.log(id1);
  console.log(id2);
  try {
    const find = await User.findOne(
      { _id: id1 },
      { contacts: [{ _id: id2 }] }
    ).exec();
    console.log(find);
  } catch (e) {
    console.log(e.message);

    throw e;
  }

  next();
};
//var picked = lodash.filter(contacts, { '_id': 'id2' } );  //console.log(picked)

/*
    try {
 

//contacts.push(id2);
  var update= await User.findByIdAndUpdate(id1,{$push:{contacts:id2}},{new:true});
  var updatesecond= await User.findByIdAndUpdate(id2,{$push:{contacts:id1}},{new:true})
  console.log(update)
  console.log(updatesecond)
//}
  } */

const handleProfileInfo = (req, res, next) => {};

module.exports = {
  deletecontact,
  addContact,
};
