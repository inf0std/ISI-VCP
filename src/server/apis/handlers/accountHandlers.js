const { sendLinkValidationEmail } = require("../mailer");
console.log(sendLinkValidationEmail);
const { genLoginToken, genEmailToken } = require("../tokens");
const {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  isAlphanumeric,
} = require("../formUtils");

const jwt = require("jsonwebtoken");
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
        res.status(400).json({ error: "Email existe déjà, connecter vous!" });
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
            sendLinkValidationEmail(
              email,
              user.id,
              user.username,
              user.emailtoken
            );
            res.status(201).send({ message: "Inscription réussie" });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send({ error: "Création Échoué" });
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

const handleLogout = (req, res) => {
  console.log("attempt to logout");
  req.session.id = null;
  req.session.token = null;
  res.clearCookie("id");
  res.clearCookie("token");
  res.redirect("http://localhost:3000/?loggedout=true");
};

const handleValidateEmail = (req, res) => {
  console.log("validation attempt");
  const id = req.params.id;
  const token = req.query.token;
  const email = req.query.email;
  console.log(email, id, token);
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    let newToken = genEmailToken(email);
    User.updateOne({ "login.email": email }, { emailtoken: newToken }).then(
      (res) => {
        if (res.modifiedCount > 0)
          sendLinkValidationEmail(email, id, "SEEN_USER", newToken);
        else verificationLinkUnvalid(res);
      }
    );
    return;
  }
  console.log(decoded);
  User.findOne({ "login.email": email }).then((user) => {
    console.log(user);
    if (
      user.login.email == email &&
      user.emailtoken == token &&
      user._id == id
    ) {
      console.log("updating");
      User.updateOne(
        { "login.email": email },
        { emailtoken: null, isverified: true }
      ).then((user) => {
        return console.log({
          message: `${user.modifiedCount} Mise à jour réussie!`,
        });
      });
      verified(res);
      return;
    } else verificationLinkUnvalid(res);
    return;
  });
};

const sentNewVerificationLink = (res) => {
  res.redirect("/?verified=false&verificationresent=true");
};

const verificationLinkUnvalid = (res) => {
  res.redirect("/?verified=false&verificationresent=flase&unvalidlink=true");
};

const verified = (res) => {
  res.redirect("/?verified=true");
};
module.exports = {
  handleLogin,
  handleSignup,
  handleValidateEmail,
  handleLogout,
};
