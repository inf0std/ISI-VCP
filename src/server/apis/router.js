var express = require('express');
const { User } = require("../db/schema/User");
const { createUser, readoneUser, auth } = require('../db/crudUtils/userCrud');
const mongoose = require('mongoose');
const { useReducer } = require('react');
const router = express.Router();
const { loginrequired } = require("../db/crudUtils/config/JWT")
const { verifiedemail } = require("../db/crudUtils/config/JWT")


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.get('/', function(req, res) {
    //profile
    res.send('');
});
//////
//authenticate
router.post('/signin', verifiedemail, function(req, res) {
    const { email, password } = req.body;
    auth(email, password)
        .then(user => {
            console.log(user.login);
            res.status(200).json(user.login)
        }).catch(err => {
            res.json({
                message: "ERROR"
            })
        })
});
router.post('/signup', function(req, res) {
    const { email, password } = req.body;
    createUser(email, password)
        .then(user => {
            console.log(user);
            res.status(200).json(user)
        }).catch(err => {
            res.json({
                message: "ERROR",
            })
        })
});

router.get('/ver', function(req, res) {
    const token = req.query.token
    User.updateOne({ emailtoken: token }, { emailtoken: null, isverified: true, }).then(user => {
        return console.log({
            message: `updated successfully!`,
        });
    })
});
router.post('/readoneUser', function(req, res) {
    //profile
    res.send('');
}, readoneUser);
router.post('/connection', function(req, res) {
    //profile
    res.send('');
});
router.post('/subscribe', function(req, res) {
    //profile
    res.send('');
});
router.get('/user/conversation', function(req, res) {
    //profile
    res.send('');
});
router.get('/user/notification', function(req, res) {
    //profile
    res.send('');
});
router.get('/user/contact', function(req, res) {
    //profile
    res.send('');
});
router.get('/conversation', function(req, res) {
    //profile
    res.send('');
});
router.get('/user/suggestion', function(req, res) {

});




router.post('/user/program')
router.get

module.exports = router;





//createUser('test@test.com', 'test123456');
//auth('test@test.com', 'test123456');
//createUser('test@test.com', 'test123456');