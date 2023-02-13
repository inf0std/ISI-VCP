//const { default: mongoose, connect } = require("mongoose");
const path = require("path");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const express = require("express");
const { default: urlJoin } = require("proper-url-join");
const app = express();
const http = require("http").createServer(app);
//const urlJoin = require("proper-url-join");
require("./modules/signaling")(http);
require("./db/db");

// Use parsing middleware
app.use(cors());
console.log(path.join(__dirname, "public"));
//app.use(express.static(path.join(__dirname, "../../build")));
app.use(
  session({
    secret: "f1i40chouh//e209u",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded());

let port = process.env.APP_PORT || 80;
http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
//app.use("/api", require("./apis/router"));
app.use("/api/account/", require("./apis/accountRouter"));
app.use("/api/user/", require("./apis/userRouter"));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

module.exports = app;
