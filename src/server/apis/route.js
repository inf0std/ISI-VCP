const express = require('express');
const router = express.Router();
const crud = require('../db/crudUtils/userCrud');


//{login, createUser,readoneUser,UpdateLogin,UpdateUser,archiveUser,deleteUser,UpdateloginAdmin,addContact

//////////////////////////////////////
router.post('/users', crud.createUser);
router.get('/users', crud.login);
router.get('/users/:id', crud.readoneUser);
//router.patch('/logins/:id', crudU.archiveUser);
router.delete('/users:id', crud.UpdateLogin);




module.exports = router;