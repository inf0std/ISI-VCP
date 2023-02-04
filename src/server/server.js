const { default: mongoose, connect } = require("mongoose");

const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");

const app = express();

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
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  session({
    secret: "f1i40chouh//e209u",
    resave: false,
    saveUninitialized: true,
  })
);
//exemple de session
app.get("/", (req, res) => {
  req.session.id = userid;
});
let port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "khlifa",
    saveUninitialized: true,
    resave: true,
  })
);

// Import the routes
const userRoutes = require("./apis/router");

// Using routes
app.use("/api", userRoutes);

module.exports = app;
