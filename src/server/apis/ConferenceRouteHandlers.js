const { default: mongoose } = require("mongoose");
var express = require("express");
const createError = require("http-errors");
const { User } = require("../db/schema/User");
const { Conference } = require("../db/schema/Conference");
const {
  createConference,
  JoinedToConference,
  LeaveTheConference,
  readConferenceAll,
  updateConference,
  deleteConference,
  deleteConferenceAll,
} = require("../db/crudUtils/conferenceCrud");

const handleCreateConference = (req, res) => {
  const { topic, users, duration, Date_begin } = req.body;
  const idU = req.params.idU;
  createConference(idU, topic, users, duration, Date_begin)
    .then((conference) => {
      res.status(200).json(conference);
      console.log(conference);
    })
    .catch((err) => {
      res.json(err, {
        message: "ERROR",
      });
    });
};

const handleConference = function (req, res) {
  readConferenceAll()
    .then((Conferences) => {
      console.log(Conferences);
      res.status(200).json(Conferences);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
const handleUpdateConference = function (req, res) {
  const newConf = req.body;
  const id = req.params.id;
  updateConference(id, newConf)
    .then((Conferences) => {
      console.log(Conferences);
      res.status(200).json(Conferences);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
const handleDeleteConference = function (req, res) {
  const id = req.params.id;
  deleteConference(id)
    .then((Conferences) => {
      console.log(Conferences);
      res.status(200).json(Conferences);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
const handleDeleteConferenceAll = function (req, res) {
  deleteConferenceAll()
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
const handleJoinedToConference = function (req, res) {
  const { idC, idU } = req.params;
  JoinedToConference(idC, idU)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
const handleLeaveTheConference = function (req, res) {
  const { idC, idU } = req.params;
  LeaveTheConference(idC, idU)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
module.exports = {
  handleCreateConference,
  handleConference,
  handleUpdateConference,
  handleDeleteConference,
  handleDeleteConferenceAll,
  handleLeaveTheConference,
  handleJoinedToConference,
};
