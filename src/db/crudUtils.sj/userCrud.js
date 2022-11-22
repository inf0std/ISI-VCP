const { default: mongoose } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const User = require('../schema/User');




const createUser =  async(newemail,newpassword)=>{

    const hashedPwd = await bcrypt.hash(newpassword, 10);
    console.log(hashedPwd);

    const newlogin = {
        email: newemail,
        password: hashedPwd
    };
    console.log(newlogin)
 
    
    try {
    
  const saveLogin = await User.create({
    login: newlogin,isadmin:false,
  });

console.log(saveLogin)   
  } catch (e) {
    console.log(e)
    
    }
  
  }
  ;
    // read one User
  const readoneUser= async (id) => {
    try {
      const user = await User.findById(id).exec();
    
      if (!user) {
        throw createError(404, 'login does not exist.');
      }
     console.log(user);
    } 
    catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
          next(createError(400, 'Invalid User id'));
          return;
        }
        next(error);
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
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Product id'));
        return;
      }
      next(error);
    }
  }
;
//update login
const UpdateUser = async (id,newUser ) => {
  
  try {
    const result = await User.findByIdAndUpdate(id, {newUser},{ new: true,  });
    console.log(result);
    if (!result) {
      throw createError(404, 'user does not exist.');
    }
    console.log(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid user id'));
      return;
    }
    next(error);
  }
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
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid user id'));
      return;
    }
    next(error);
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
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid user id'));
      return;
    }
    next(error);
  }
};






module.exports = {createUser,readoneUser,UpdateLogin,UpdateUser,archiveUser,deleteUser};
