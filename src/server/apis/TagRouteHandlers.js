const { default: mongoose } = require("mongoose");
var express = require("express");
const createError = require("http-errors");
const { Tag } = require("../db/schema/Tag");
const {
  createTag,
  getAllTags,
  deleteTag,
  updateTag,
  getConferenceWithTags,
  getReunionWithTags,
  addTagToConference,
  addTagToReunion,
  getTag,
} = require("../db/crudUtils/TagCrud");

const handleCreateTag = (req, res) => {
  const { name } = req.body;
  createTag(name)
    .then((tag) => {
      res.status(200).json(tag);
      console.log(tag);
    })
    .catch((err) => {
      res.json(err, {
        message: "ERROR",
      });
    });
};

const handleTag = function (req, res) {
  getAllTags()
    .then((Tag) => {
      console.log(Tag);
      res.status(200).json(Tag);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
const handleUpdateTag = function (req, res) {
  const newTag = req.body;
  const id = req.params.id;
  updateTag(id, newTag)
    .then((Tag) => {
      console.log(Tag);
      res.status(200).json(Tag);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
const handleDeleteTag = function (req, res) {
  const id = req.params.id;
  deleteTag(id)
    .then((tag) => {
      console.log(tag);
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};

const handleAddTagToConf = function (req, res) {
  const { idC, idT } = req.params;
  addTagToConference(idC, idT)
    .then((Tag) => {
      res.status(200).json(Tag);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
const handleGetConfWithTag = function (req, res) {
  const { idT } = req.params;
  getConferenceWithTags(idT)
    .then((conference) => {
      res.status(200).json(conference);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
const handleAddTagToReun = function (req, res) {
  const { idT, idR } = req.params;
  addTagToReunion(idT, idR)
    .then((Tag) => {
      res.status(200).json(Tag);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
const handleGetReunWithTag = function (req, res) {
  const { idT } = req.params;
  getReunionWithTags(idT)
    .then((reunion) => {
      res.status(200).json(reunion);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "ERROR",
      });
    });
};
module.exports = {
  handleCreateTag,
  handleTag,
  handleUpdateTag,
  handleDeleteTag,
  handleGetConfWithTag,
  handleGetReunWithTag,
  handleAddTagToConf,
  handleAddTagToReun,
};
