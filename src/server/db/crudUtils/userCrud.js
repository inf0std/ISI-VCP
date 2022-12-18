const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const { User } = require("../schema/User");
const Conversation = require("../schema/Conversation");

const createUser = (ewemail, newpassword) => {
    if (!newemail || !newpassword) {
        return console.log(404, "veuilleur saisir data");
    }
    const userExists = User.findOne({ "login.email": newemail });
    //const userExists = await User.findOne({ login:newemail});
    if (userExists) {
        console.log("User already exists");
    } else {
        const saveLogin = User.create({
            login: {
                email: newemail,
                password: newpassword,
            },
            isadmin: false,
        });

        console.log(saveLogin);
    }
}


const auth = async(email, password) => {
    console.log('email', email);
    if (!email || !password) {
        return console.log(404, "veuilleur saisir data");
    }

    return User.findOne({ "login.email": email }).then(async(user) => {
        console.log(user)
        if (user && (await user.matchPassword(password))) {
            return user
        } else {
            return console.log("Invalid Email or Password");
        }
    })
}

// read one User
const readoneUser = async(id) => {
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
const UpdateLogin = async(id, newlogin) => {
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
const UpdateUser = async(id, newUser) => {
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
const UpdateloginAdmin = async(id, newlogin) => {
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
const archiveUser = async(id) => {
    try {
        const result = await User.findByIdAndUpdate(
            id, { archive: true }, { new: true }
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
const deleteUser = async(id) => {
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

const addContact = async(idUser, idContact) => {
        if (!idUser || !idContact) { throw createError(404, 'veuilleur saisir data'); };
        console.log(idUser)
        console.log(idContact)
        User.findById(idUser).select('contacts').exec().then(conta => { console.log(conta) });



        //var picked = lodash.filter(contacts, { '_id': 'idContact' } );  //console.log(picked)

        /*
    try {
 

//contacts.push(idContact);
  var update= await User.findByIdAndUpdate(idUser,{$push:{contacts:idContact}},{new:true});
  var updatesecond= await User.findByIdAndUpdate(idContact,{$push:{contacts:idUser}},{new:true})
  console.log(update)
  console.log(updatesecond)
//}
  } catch (e) {
    console.log(e.message)
    
    throw e
    
    }*/

    }
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

module.exports = { auth, createUser, readoneUser, UpdateLogin, UpdateUser, archiveUser, deleteUser, UpdateloginAdmin, addContact };