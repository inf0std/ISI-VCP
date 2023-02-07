const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const { User } = require("../schema/User");
const Conversation = require("../schema/Conversation");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { count } = require("console");

//email
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "seen.project.cpi@gmail.com",
    pass: "dehbaarxnwdujndl",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//register
const createUser = async (email, password) => {
  if (!email || !password) {
    return console.log(404, "veuilleur saisir data");
  } else {
    User.countDocuments({ "login.email": email }).then((count) => {
      if (count > 0) {
        console.log(count);
        console.log("user aleardy existed");
      } else {
        const user = new User({
          login: {
            email: email,
            password: password,
          },
          isadmin: false,
          isverified: false,
          emailtoken: jwt.sign(
            {
              nonce: crypto.randomBytes(64).toString("hex"),
              email: email,
              exp: Date.now() + 24 * 60 * 60 * 1000,
            },
            "byiuehgguihr398yhwubfwefj/fwijiohfwe"
          ),
        });
        user
          .save(user)
          .then(async (user) => {
            console.log(user);
            return user;
          })
          .catch((err) => {
            console.log({
              message:
                err.message || "Some error occurred while saving the user.",
            });
          });

        //send email verification
        var mailOptions = {
          from: '"Verify your email"<mira98315@gmail.com>',
          to: user.login.email,
          subject: `${user.username}  verify your email`,
          html: `<h2> ${user.username}! Thanks for registring on our site </h2>
        <h4>Please verify your email to continue... </h4>
        <a href = "http://127.0.0.1:8080/api/ver?token=${user.emailtoken}">verify your email</a>`,
        };
        //send email
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("verification email is sent to your gmail account");
          }
        });
      }
    });
  }
};

const verifyemail = (token, email) => {
  User.findOne({ login });
  User.findOne({ emailtoken: token }).then((user) => {
    if (user) {
      (user.emailtoken = null), (user.isverified = true);
    } else {
      console.log("email is not verified");
    }
  });
};

//create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//authenticate
const auth = async (email, password) => {
  console.log("email", email);
  if (!email || !password) {
    return console.log(404, "veuilleur saisir data");
  } else {
    return User.findOne({ "login.email": email }).then(async (user) => {
      if (user && (await user.matchPassword(password))) {
        const token = createToken(user._id);
        console.log(token);
        cookie("access-token", token);
        return user;
      } else {
        return console.log("Invalid Email or Password");
      }
    });
  }
};

// read one User
const readoneUser = async (id) => {
  try {
    const user = await User.findById(id, { archive: false }).exec();
    console.log(user);
    if (!user) {
      throw createError(404, "login does not exist.");
    }
  } catch (error) {
    console.log(error.message);
    throw e;
  }
};

//update login
const UpdateLogin = async (id, newlogin) => {
  if (!newlogin || !id) {
    throw createError(404, "veuilleur saisir data");
  }
  try {
    // const result = await User.findByIdAndUpdate(id, {login: newlogin },{ new: true,  });
    const result = await User.findById(id);
    var newuser = { login: { newlogin } };

    await result.updateOne(newuser);
    console.log(result);
    if (!result) {
      throw createError(404, "cant update.");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
//update user
const UpdateUser = async (id, newUser) => {
  if (!newUser) {
    throw createError(404, "veuilleur saisir data");
  }
  const neuser = { newUser };
  try {
    const result = await User.findByIdAndUpdate(id, newuser, { new: true });
    console.log(result);
    if (!result) {
      throw createError(404, "user does not exist.");
    }
    console.log(result);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

//update useradmin
const UpdateloginAdmin = async (id, newlogin) => {
  if (!newlogin || !id) {
    throw createError(404, "veuilleur saisir data");
  } else {
    const admin = {
      login: { newlogin },
      isadmin: true,
    };

    try {
      const result = await User.findByIdAndUpdate(id, admin, { new: true });
      console.log(result);
      if (!result) {
        throw createError(404, "user does not exist.");
      }
      console.log(result);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
};

const updateemail = (id, newemail) => {
  console.log(newemail);
  if (!newemail || !id) {
    return console.log({
      message: "Data to update can not be empty!",
    });
  }

  //const id = req.params.id;

  User.findByIdAndUpdate(
    id,
    { "login.email": newemail },
    { new: true },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        console.log("le resultat " + result);
        return result;
      }
    }
  );
};

const updatepasse = (id, newpasse) => {
  if (!newpasse || !id) {
    return console.log({
      message: "Data to update can not be empty!",
    });
  }

  //const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data) {
        return console.log({
          message: `Cannot update Conference with id=${id}. Maybe Conference does not exist!`,
        });
      } else {
        data.login.passe = newpasse;
        data.save();
        console.log({ message: "passeword was updated successfully." });
      }
    })
    .catch((err) => {
      return console.log({
        message: "Error updating passeword with id = " + id,
      });
    });
};
//update login
const archiveUser = async (id) => {
  try {
    const result = await User.findByIdAndUpdate(
      id,
      { archive: true },
      { new: true }
    );
    console.log(result);
    if (!result) {
      throw createError(404, "user does not exist.");
    }
    console.log(result);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
//delette User
const deleteUser = async (id) => {
  try {
    const result = await User.findByIdAndDelete(id);
    console.log(result);
    if (!result) {
      throw createError(404, "user does not exist.");
    }
    console.log(result);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

/*
  User.findById(id1)
    .select("contacts")
    .exec()
    .then((contacts) => {
      if (contacts.contacts.indexOf(id2) < -1) {
        try {
          //contacts.push(id2);
          User.findByIdAndUpdate(
            id1,
            { $push: { contacts: id2 } },
            { new: true }
          );
          User.findByIdAndUpdate(
            id2,
            { $push: { contacts: id1 } },
            { new: true }
          );
        } catch (e) {
          console.log(e.message);
          throw e;
        }
      }
    });
;
*/

module.exports = {
  auth,
  verifyemail,
  createUser,
  readoneUser,
  UpdateLogin,
  UpdateUser,
  archiveUser,
  deleteUser,
  UpdateloginAdmin,
  updatepasse,
  updateemail,
};
