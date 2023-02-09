const { default: mongoose, connect } = require("mongoose");

const cookieparser = require("cookie-parser");
const Cors = require("cors");
const session = require("express-session");
const express = require("express");
const app = express();
app.use(Cors());
const http = require("http").createServer(app);

require("./modules/signaling")(http);
require("./db/db");

//connectDb().catch(err =>console.log('db not connected'));

// Use parsing middleware
app.use(
  Cors({
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

app.use(express.json());
app.use(express.urlencoded());
//exemple de session
app.get("/", (req, res) => {
  req.session.id = 1;
  res.send("hello");
});

let port = 8080;
http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
//app.use("/api", require("./apis/router"));
app.use("/api/account", require("./apis/accountRouter"));
app.use("/api/user", require("./apis/userRouter"));

module.exports = app;
