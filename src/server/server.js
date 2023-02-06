const { default: mongoose, connect } = require("mongoose");

const cookieparser = require("cookie-parser");
const Cors = require("cors");
const session = require("express-session");
const express = require("express");
const app = express();
app.use(Cors());
const http = require("http").createServer(app);
/* const io = new require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
}); */
require("./modules/signaling")(http);
/* io.on("connection", (socket) => {
  console.log(`socket of id ${socket.id} has comnected`);
}); */
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

/* // Use parsing middleware
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
  req.session.id = 1;
  res.send("hello");
});
 */
let port = 8080;
http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
/* 
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import the routes
const userRoutes = require("./apis/router");
// Using routes
app.use("/api", userRoutes); */

module.exports = app;
