const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const User = require("../schema/User");
const Conversation = require("../schema/Conversation");

const createUser = async (newemail, newpassword) => {
  if (!newemail || !newpassword) {
    throw createError(404, "veuilleur saisir data");
  }
  const userExists = await User.findOne({ "login.email": newemail });
  //const userExists = await User.findOne({ login:newemail});
  if (userExists) {
    throw new Error("User already exists");
  } else {
    try {
      const saveLogin = await User.create({
        login: {
          email: newemail,
          password: newpassword,
        },
        isadmin: false,
      });

      console.log(saveLogin);
    } catch (e) {
      console.log(e);

      throw e;
    }
  }
};

const auth = async (nemail, npassword) => {
  console.log(nemail);
  if (!nemail || !npassword) {
    throw createError(404, "veuilleur saisir data");
  }
  try {
    const user = await User.findOne({ "login.email": nemail });
    if (user && (await user.matchPassword(npassword))) {
      return user;
    } else {
      throw new Error("Invalid Email or Password");
    }
  } catch (e) {
    console.log(e);
    throw e;
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
  try {
    const result = await User.findByIdAndUpdate(id, newUser, { new: true });
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

const addContact = async (id1, id2) => {
  if (!id1 || !id2) {
    throw createError(404, "veuilleur saisir data");
  }
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
};

module.exports = {
  auth,
  createUser,
  readoneUser,
  UpdateLogin,
  UpdateUser,
  archiveUser,
  deleteUser,
  UpdateloginAdmin,
  addContact,
};
