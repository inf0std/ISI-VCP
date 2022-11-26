const { default: mongoose } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const {User} = require('../schema/User');

const Conversation = require('../schema/Conversation');





const createUser =  async(newemail,newpassword)=>{
  if(!newemail || !newpassword){
    throw createError(404, 'veuilleur saisir data'); 
  };

  const newlogin = {
    email: newemail,
    password: newpassword
  };
    console.log(newlogin)
    const userExists = await User.findOne({ login:{newemail }});
   //const userExists = await User.findOne({ login:newemail});
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }else{
    try {
    
  const saveLogin = await User.create({
    login: newlogin,isadmin:false,
  });

console.log(saveLogin)   
  } catch (e) {
    console.log(e)
    
    throw e
    
    }
    }
  }
  ;

  /*const login = async (email, pwd)=>{
    if(!email || !pwd){throw createError(404, 'veuilleur saisir data'); };
    const login = {
        email: email,
        password: pwd
    };
    console.log(login)
    const user = await User.findOne(login);
   //const userExists = await User.findOne({ login:newemail});
    if (user) {
      return user;
    }
    throw new Error("User does not exist");
  }*/

  const login = async (email, password) => {

    const user = await User.findOne({ login:{email }});
  
    if (user && (await user.login.matchPassword(password))) {
      console.log({
        _id: user._id,
        username: user.username,
        email: user.login.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
     
      });
    } else {
     
      throw new Error("Invalid Email or Password");
    }
  }
    // read one User
  const readoneUser= async (id) => {
    try {
      const user = await User.findById(id, {archive:false}).exec();
      console.log(user);
      if (!user) {
        throw createError(404, 'login does not exist.');
      }
    
    } 
    catch (error) {
        console.log(error.message);
        throw e
        }
     
      
  };

  


//update login
 const UpdateLogin  = async (id,newlogin ) => {
  
    try {
      const result = await User.findByIdAndUpdate(id,{  $set: {login: newlogin }},{ new: true,  });
      console.log(result);
      if (!result) {
        throw createError(404, 'Product does not exist.');
      }
      console.log(result);
    } catch (error) {
      console.log(error.message);
      throw e
  }
;};
//update user
const UpdateUser = async (id,newUser ) => {
  if(!newUser){throw createError(404, 'veuilleur saisir data'); };
  try {
    const result = await User.findByIdAndUpdate(id, {newUser},{ new: true,  });
    console.log(result);
    if (!result) {
      throw createError(404, 'user does not exist.');
    }
    console.log(result);
  } catch (error) {
    console.log(error.message);
   throw error
  }
};

//update useradmin
const UpdateloginAdmin = async (id,newlogin ) => {
  if(!newlogin || !id){throw createError(404, 'veuilleur saisir data'); }
  else{

  const admin ={
   login:newlogin,
   isadmin:true,
  }

  try {
    const result = await User.findByIdAndUpdate(id, {admin},{ new: true,  });
    console.log(result);
    if (!result) {
      throw createError(404, 'user does not exist.');
    }
    console.log(result);
  } catch (error) {
    console.log(error.message);
   throw error
  }};
};

//update login
const archiveUser = async (id ) => {
  
  try {
    const result = await User.findByIdAndUpdate(id, {archive:true},{ new: true,  });
    console.log(result);
    if (!result) {
      throw createError(404, 'user does not exist.');
    }
    console.log(result);
  } catch (error) {
    console.log(error.message);
   
    throw error;
  }
};
//delette User
const deleteUser  = async (id) => {
 
  try {
    const result = await User.findByIdAndDelete(id);
    console.log(result);
    if (!result) {
      throw createError(404, 'user does not exist.');
    }
    console.log(result);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const addContact =  async(idUser,idContact)=>{
  if(!idUser || !idContact){throw createError(404, 'veuilleur saisir data'); };
  console.log(idUser)
    console.log(idContact)
    var contacts = readoneUser(idUser).select('contacts');
    try {
 
  const found =contacts.find(idContact);
  if(found){throwcreateError(404, 'deja existant');}else{
//contacts.push(idContact);
  var update= await User.findByIdAndUpdate(idUser,{$push:{contacts:idContact}},{new:true})
  console.log(update)
}
  } catch (e) {
    console.log(e.message)
    
    throw e
    
    }
  
  }
  ;


module.exports = {login, createUser,readoneUser,UpdateLogin,UpdateUser,archiveUser,deleteUser,UpdateloginAdmin,addContact};
