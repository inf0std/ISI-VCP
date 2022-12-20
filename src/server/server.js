const mongoose = require("mongoose");
const express = require("express");
const app = express();
const router = express.Router();
const cookieparser = require("cookie-parser");

// DB Connection
require("dotenv").config();

connectDb().catch((err) => console.log("db not connected"));

//connectDb().catch(err =>console.log('db not connected'));

async function connectDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/seendb");
  console.log("db connect");
}

module.exports = {
  connectDb,
};

// Use parsing middleware
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import the routes
const userRoutes = require("./apis/router");

// Using routes
app.use("/api", userRoutes);

module.exports = app;
