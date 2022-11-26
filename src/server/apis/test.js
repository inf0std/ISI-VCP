const {connectDb}=require('..//db/db.js');
const express = require('express');
const app = express();
const {createUser,readoneUser,UpdateLogin,UpdateUser,archiveUser,deleteUser, addContact,auth} = require('../db//crudUtils/userCrud');
const port = process.env.PORT || 3000;//ebergement

/*
createUser('khelifa@gmail.coml', '00000000000000');
createUser('saida@gmail.coml', '0055000000000');
createUser('ahmed@gmail.coml', '0000000000FFFD0000');
createUser('ficel@gmail.coml', '000000000055550000');*/

/*
UpdateUser('63828f04629963f37bfc932c', {pic :'img.jpeg',username:'khlifa'});
UpdateUser('63828f04629963f37bfc9330', {pic :'profile.jpeg',username:'saida'});
UpdateUser('63828f04629963f37bfc9332', {username:'ahmed'});
UpdateUser('63828f04629963f37bfc932e', {pic :'09.jpeg'});
*/

//addContact('63828f04629963f37bfc932c','63828f04629963f37bfc9330' );
UpdateLogin('63828f04629963f37bfc9332',{email:'hmedon@gmail.com',password:'kkkkkl'});
//auth('khelif@gmail.coml','00000000000000')
/*
app.use(express.json());


// lancer aplication sur notre port
app.listen(port,() => {console.log(`server lancer sur le port a:http//localhost:${port}`);
//The app.listen() function is used to bind and listen the connections on the specified host and port.

});

*/


