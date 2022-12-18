const mongoose = require('mongoose');
const express = require("express")
const { readoneUser, auth, createUser } = require('../db/crudUtils/userCrud');
const { useReducer } = require('react');


const router = express.Router();

//
const handleConnection = (req, res) => {
    const { email, password } = req.body;
    auth(email, password)
        .then(user => {
            console.log(user)
            res.json(200, user)
        }).catch(err => {
            res.json({
                message: "ERROR",
            })
        })
}


module.exports = handleConnection