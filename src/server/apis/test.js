const {connectDb}=require('..//db/db.js');
const express = require('express');
const app = express();
const {createUser,readoneUser,UpdateLogin,UpdateUser,archiveUser,deleteUser, addContact,auth} = require('../db//crudUtils/userCrud');
const port = process.env.PORT || 3000;//ebergement


//createUser('khelif@gmail.coml', '00000000000000');
//UpdateUser('63824f7966be5e2b276de20d', {pic :'jjjj.jpeg'});
//addContact('6381fb9316gpçj793accb59d1df','6381fb93160dsçf73accb59d1df' );
//UpdateLogin('63824f7966be5e2b276de20d',{email:'aljjj@gmail.com',password:'kkkkkl'});
auth('khelif@gmail.coml','00000000000000')
/*
app.use(express.json());


// lancer aplication sur notre port
app.listen(port,() => {console.log(`server lancer sur le port a:http//localhost:${port}`);
//The app.listen() function is used to bind and listen the connections on the specified host and port.

});

*/


