const { sendLinkValidationEmail } = require("../mailer");
console.log(sendLinkValidationEmail);
const { genLoginToken, genEmailToken } = require("../tokens");
const {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  isAlphanumeric,
} = require("../formUtils");
const { User } = require("../../db/schema/User");
const { auth } = require("../../db/crudUtils/userCrud");

const handleSignup = async (req, res) => {
  const { email, password, password2, username, phone } = req.body;

  if (
    !validateEmail(email) ||
    !validatePassword(password, password2) ||
    !validatePhoneNumber(phone) ||
    !isAlphanumeric(username)
  ) {
    res.status(500).send({ error: "invalid inputs" });
  } else {
    User.findOne({ "login.email": email }).then((user) => {
      if (user) {
        res.status(400).send({ error: "email exist deja" });
      } else {
        User.create({
          login: {
            email,
            password,
          },
          username: username,
          phone: phone,

          isadmin: false,
          isverified: false,
          emailtoken: genEmailToken(email),
        })
          .then((user) => {
            sendLinkValidationEmail(email, user.id, user.username);
            res.status(201).send({ message: "Signup seccessful" });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send({ error: "creation Echoue" });
          });
      }
    });
  }
};

const handleLogin = (req, res) => {
  console.log("Login attempt");
  const { email, password } = req.body;
  auth(email, password)
    .then((user) => {
      let token = genLoginToken(user._id);
      console.log(`token ${token}`);
      req.session.id = user._id;
      res.cookie("id", user._id);
      res.cookie("token", token);
      res.status(200).send({ _id: user.id, name: user.username, token: token });
    })
    .catch((err) => {
      res.json({
        message: "ERROR",
      });
    });
};

const handleValidateEmail = function (req, res, next) {
  const id = req.params.id;
  const token = req.params.token;
  const email = req.params.email;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    User.findById(id).then((user) => {
      if (user.login.email == email && user.emailtoken == token)
        User.updateOne(
          { "login.email": email },
          { emailtoken: null, isverified: true }
        ).then((user) => {
          return console.log({
            message: `${user.modifiedCount} updated successfully!`,
          });
        });
    });
  } catch (err) {}

  next();
};

module.exports = {
  handleLogin,
  handleSignup,
  handleValidateEmail,
};
