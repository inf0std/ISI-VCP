const app = require("./src/server/server");
/* const jwt = require("jsonwebtoken");
let token;
token = jwt.sign(
  { msg: "hello there", exp: Date.now() + 24 * 60 * 60 * 1000 },
  "qwertyuiop"
);
console.log(token);
let decoded = jwt.verify(token, "qwertyuiop");
console.log(decoded.exp);
console.log(Date.now()); */

/*
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ff_ahcene@esi.dz",
    pass: "ivwhoxajhjgaqtup",
  },
});
var mailOptions = {
  from: "ff_ahcene@esi.dz",
  to: "ahcene.faicel@gmail.com",
  subject: "seen subscription",
  text: "Plaintext version of the message",
  html: "<p>HTML version of the message <a href='google.com'>google</a></p>",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
*/
