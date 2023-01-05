const { default: mongoose } = require("mongoose");
var express = require("express");
const createError = require("http-errors");
const { User } = require("../db/schema/User");
const { Reunion } = require("../db/schema/Reunion");

const { createReunion, readReunionAll, updateReunion, deleteReunion, deleteReunionAll, Moderateur, JoinedToReunion, LeaveTheReunion } = require("../db/crudUtils/reunionCrud");

const handleCreateReunion = (req, res) => {
    const { reunion_Name, participantsName, Date_begin, Duration } = req.body;
    const idU = req.params.idU;
    console.log(idU)
    createReunion(idU, reunion_Name, participantsName, Date_begin, Duration)
        .then((Reunions) => {
            res.status(200).json(Reunions);
        })
        .catch((err) => {
            res.json({
                message: "ERROR",
            });
        });
};

const handleReunion = function(req, res) {
    readReunionAll()
        .then((Reunions) => {
            res.status(200).json(Reunions);
        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: "ERROR",
            });
        });
};
const handleUpdateReunion = function(req, res) {
    const newConf = req.body;
    const id = req.params.id;
    updateReunion(id, newConf)
        .then((Reunions) => {
            res.status(200).json(Reunions);
        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: "ERROR",
            });
        });
};
const handleDeleteReunion = function(req, res) {
    const id = req.params.id;
    deleteReunion(id)
        .then((Reunions) => {
            res.status(200).json(Reunions);
        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: "ERROR",
            });
        });
};
const handleDeleteReunionAll = function(req, res) {
    deleteReunionAll()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: "ERROR",
            });
        });
};
const handleModerateur = function(req, res) {
    const { idR, idM } = req.params;
    Moderateur(idR, idM)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: "ERROR",
            });
        });
};
const handleJoinedToReunion = function(req, res) {
    const { idR, idU } = req.params;
    JoinedToReunion(idR, idU)
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
const handleLeaveTheReunion = function(req, res) {
    const { idR, idU } = req.params;
    LeaveTheReunion(idR, idU)
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
    handleCreateReunion,
    handleReunion,
    handleUpdateReunion,
    handleDeleteReunion,
    handleDeleteReunionAll,
    handleModerateur,
    handleLeaveTheReunion,
    handleJoinedToReunion
};