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

//const sendEmail = (targetEmail, header, body);
module.exports = { allUsers };
