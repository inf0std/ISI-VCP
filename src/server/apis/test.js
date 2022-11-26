const {connectDb}=require('../db/db');
const express = require('express');
const { route } = require('./router');
const app = express();
//const {createUser,readoneUser,UpdateLogin,UpdateUser,archiveUser,deleteUser} = require('./crudUtils/userCrud');
const port = process.env.PORT || 3000;//ebergement


app.use(express.json());
app.use(route)

// lancer aplication sur notre port
app.listen(port,() => {console.log(`server lancer sur le port a:http//localhost:${port}`);
//The app.listen() function is used to bind and listen the connections on the specified host and port.

});


