const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const { User } = require("../db/schema/User");
const Conversation = require("../db/schema/Conversation");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { count } = require("console");
const asyncHandler = require("express-async-handler");

const allUsers = asyncHandler(async(req, res) => {
    const keyword = req.query.search ?
        {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { login: { email: { $regex: req.query.search, $options: "i" } } },
            ],
        } :
        {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

//email
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "seen.project.cpi@gmail.com",
        pass: "dehbaarxnwdujndl",
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const registerUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({ login: { email } });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        login: {
            email,
            password,
        },
        isadmin: false,
        isverified: false,
        emailtoken: crypto.randomBytes(64).toString("hex"),
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.username,
            email: user.login.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: user.emailtoken,
        });

        //send email verification
        var mailOptions = {
            from: `Verify your email<${user.login.email}>`,
            to: user.login.email,
            subject: `${user.username}  verify your email`,
            html: `<h2> ${user.username}! Thanks for registring on our site </h2>
  <h4>Please verify your email to continue... </h4>
  <a href = "http://127.0.0.1:8080/api/ver?token=${user.emailtoken}">verify your email</a>`,
        };
        //send email
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("verification email is sent to your gmail account");
            }
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});
module.exports = { registerUser, allUsers };