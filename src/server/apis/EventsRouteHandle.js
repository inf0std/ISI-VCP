const { default: mongoose } = require("mongoose");
var express = require("express");
const createError = require("http-errors");
const { User } = require("../db/schema/User");
const { Conference } = require("../db/schema/Conference");
const {
  SetEventR,
  SetEventC,
  getUserMissedEventsReunion,
  getUserMissedEventsConference,
  getUserProgrammedEventsConference,
  getUserProgrammedEventsReunion,
} = require("../db/crudUtils/conferenceCrud");

const handleSetEvents = (req, res) => {
  SetEventC().then((events1) => {
    setTimeout(() => +"\n", 100);
  });
  SetEventR().then((events2) => {
    setTimeout(() => +"\n", 100);
  });
  setTimeout(() => res.end(`Your Events are up to date now!`), 400);
};

const handleGetProgrammedEvents = (req, res) => {
  const { idU } = req.params;

  getUserProgrammedEventsReunion(idU).then((events1) => {
    setTimeout(() => res.write(`reunions: ${events1}`) + "\n", 100);
  });
  getUserProgrammedEventsConference(idU).then((events2) => {
    setTimeout(() => res.write(`conferences: ${events2}`) + "\n", 100);
  });
  setTimeout(() => res.end(), 400);
};

const handleGetMissedEvents = (req, res) => {
  const { idU } = req.params;

  getUserMissedEventsReunion(idU).then((events1) => {
    setTimeout(() => res.write(`reunions: ${events1}`) + "\n", 100);
  });
  getUserMissedEventsConference(idU).then((events2) => {
    setTimeout(() => res.write(`conferences: ${events2}`) + "\n", 100);
  });
  setTimeout(() => res.end(), 400);
};

module.exports = {
  handleSetEvents,
  handleGetMissedEvents,
  handleGetProgrammedEvents,
};
