const { default: mongoose } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const createError = require('http-errors');



const User = require('../models/User');




/////methode post
const createLogin =  async(req,res,next)=>{

    const newemail = req.body.email;
      const newpassword= req.body.password;
  
    const hashedPwd = await bcrypt.hash(newpassword, 10);
    console.log(hashedPwd);

    const newlogin = {
        email: newemail,
        password: hashedPwd
    };
    console.log(newlogin)
 
    
    try {
      //attendre Login  soit sauvgarder then create user
  const saveLogin = await User.create({
    login: newlogin,isadmin:false,
  });
  res.status(201).send(saveLogin);
   
  } catch (e) {
    console.log(e)
      res.status(400).send(e);
    }
  
  }
  ;


  // read all users
   const readLogin= async(req,res,next)=>{
    

    try {
  const Listlogins = await User.find({}).select('login');//trouver tout les users les {} bien vide
  res.send(Listlogins);
   
  } catch (e) {
      res.status(500).send(e);//aficher erreur 500 objet non trouver 
    }
  
  };



    // read one login
  const readoneLogin= async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log(id);
    
      const login = await User.findById(id).select('login');
      console.log(login);


      if (!login) {
        throw createError(404, 'login does not exist.');
      }
      res.send(login);
    } 
    catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
          next(createError(400, 'Invalid login id'));
          return;
        }
        next(error);
      }
  };

  


//update login
 const UpdateLogin  = async (req, res, next) => {
    const id = req.params.id;
    const {newlogin} = req.body;
    try {
      const result = await User.findByIdAndUpdate(id,{   $set: {login: newlogin }},{ new: true,  });
      console.log(result);
      if (!result) {
        throw createError(404, 'Product does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Product id'));
        return;
      }
      next(error);
    }
  }














  

/*
const createUser = async (req, res) => {
    const { newemail, pwd } = req.body;
    //if (!newemail || !pwd) return res.status(400).json({ 'message': 'email and password are required.' });//si sont vide

    // check for duplicate usernames in the db
   // const duplicate = await Login.findOne({ email: newemail }).exec();// trouver exactement username
   // if (duplicate) return res.sendStatus(409).json({ 'message': 'user exist yet.' }); //Conflict /user exist

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await Login.create({
            "email": newemail,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${newemail} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
*/
module.exports = {createLogin, readLogin,readoneLogin,UpdateLogin};
