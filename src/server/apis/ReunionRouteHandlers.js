const { default: mongoose } = require("mongoose");
var express = require("express");
const createError = require("http-errors");
const { User } = require("../db/schema/User");
const { Reunion } = require("../db/schema/Reunion");

const { createReunion, readReunionAll, updateReunion, deleteReunion, deleteReunionAll } = require("../db/crudUtils/reunionCrud");

const handleCreateReunion = (req, res, next) => {
    const { reunion_Name, participantsName, Date_begin, Duration } = req.body;
    const idU = req.params.idU;
    console.log(idU)
    createReunion(idU, reunion_Name, participantsName, Date_begin, Duration)
        .then((Reunions) => {
            console.log(Reunions)
            res.status(200).json(Reunions);
        })
        .catch((err) => {
            res.json({
                message: "ERROR",
            });
        });
    next();
};

const handleReunion = function(req, res, next) {
    readReunionAll()
        .then((Reunions) => {
            console.log(Reunions);
            res.status(200).json(Reunions);
        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: "ERROR",
            });
        });
    next();
};
const handleUpdateReunion = function(req, res, next) {
    const newConf = req.body;
    const id = req.params.id;
    updateReunion(id, newConf)
        .then((Reunions) => {
            console.log(Reunions);
            res.status(200).json(Reunions);
        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: "ERROR",
            });
        });
    next();
};
const handleDeleteReunion = function(req, res, next) {
    const id = req.params.id;
    deleteReunion(id)
        .then((Reunions) => {
            console.log(Reunions);
            res.status(200).json(Reunions);
        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: "ERROR",
            });
        });
    next();
};
const handleDeleteReunionAll = function(req, res, next) {
    deleteReunionAll()
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
    handleCreateReunion,
    handleReunion,
    handleUpdateReunion,
    handleDeleteReunion,
    handleDeleteReunionAll
};