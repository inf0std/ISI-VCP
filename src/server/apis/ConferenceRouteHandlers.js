const { default: mongoose } = require("mongoose");
var express = require("express");
const createError = require("http-errors");
const { User } = require("../db/schema/User");
const { Conference } = require("../db/schema/Conference");

const { createConference, readConferenceAll, updateConference, deleteConference, deleteConferenceAll } = require("../db/crudUtils/conferenceCrud");

const handleCreateConference = (req, res, next) => {
    const { topic, users, duration, Date_begin } = req.body;
    const idU = req.params.idU;
    console.log(idU)
    createConference(idU, topic, users, duration, Date_begin)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.json({
                message: "ERROR",
            });
        });
    next();
};

const handleConference = function(req, res, next) {
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
    next();
};
const handleUpdateConference = function(req, res, next) {
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
    next();
};
const handleDeleteConference = function(req, res, next) {
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
    next();
};
const handleDeleteConferenceAll = function(req, res, next) {
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
    next();
};

module.exports = {
    handleCreateConference,
    handleConference,
    handleUpdateConference,
    handleDeleteConference,
    handleDeleteConferenceAll
};