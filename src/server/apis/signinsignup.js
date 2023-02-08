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

const {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  isAlphanumeric,
} = require("./formUtils");

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { login: { email: { $regex: req.query.search, $options: "i" } } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//email
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "seen.project.cpi@gmail.com",
    pass: "imycppaougenucwm",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//const sendEmail = (targetEmail, header, body);
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, password2, username, phone } = req.body;

  console.log(req.body);
  console.log(
    "email",
    email,
    "password",
    password,
    "password2",
    password2,
    "username",
    username,
    "phone",
    phone
  );
  if (
    !validateEmail(email) ||
    !validatePassword(password, password2) ||
    !validatePhoneNumber(phone) ||
    !isAlphanumeric(username)
  ) {
    console.log("validation failed");
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ login: { email } });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      login: {
        email,
        password,
      },
      username: username,
      phone: phone,

      isadmin: false,
      isverified: false,
      emailtoken: jwt.sign(
        {
          nonce: crypto.randomBytes(64).toString("hex"),
          email: email,
          exp: Date.now() + 24 * 60 * 60 * 1000,
        },
        "byiuehgguihr398yhwubfwefj/fwijiohfwe"
      ),
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.username,
        email: user.login.email,
        isAdmin: user.isAdmin,
        phone: user.phone,
        pic: user.pic,
        emailtoken: user.emailtoken,
      });

      //send email verification
      var mailOptions = {
        from: "seen.project.cpi@gmail.com",
        to: user.login.email,
        subject: `${user.username}  verify your email`,
        html: `<h2> ${user.username}! WELCOME TO THE SEEN FAMILY </h2>
        <h4>Please verify your email by clicking on the link bellow to continue... </h4><p><br/>
        <a href = "http://127.0.0.1:8080/api/ver/email =${user.login.email}/token=${user.emailtoken}">
        verify your email
        </a> <br>this link will only remain available for the next 24 hours</p>`,
      };
      //send email
      transporter.sendMail(mailOptions, function (error, info) {
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
  }
});

module.exports = { registerUser, allUsers };
