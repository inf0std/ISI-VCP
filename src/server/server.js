//const { default: mongoose, connect } = require("mongoose");
const path = require("path");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const express = require("express");
const app = express();
const http = require("http").createServer(app);

require("./modules/signaling")(http);
//require("./db/db");

// Use parsing middleware
app.use(cors());
console.log(path.join(__dirname, "public"));
app.use(
  session({
    secret: "f1i40chouh//e209u",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded());

let port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
//app.use("/api", require("./apis/router"));
app.use("/api/account/", require("./apis/accountRouter"));
app.use("/api/user/", require("./apis/userRouter"));

module.exports = app;
