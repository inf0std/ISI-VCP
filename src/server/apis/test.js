const { connectDb } = require('../db/db');
const express = require('express');
const app = express();
const { createUser, readoneUser, UpdateLogin, UpdateUser, archiveUser, deleteUser, addContact } = require('../db/crudUtils/userCrud');
const { addConversation } = require('../db/crudUtils/conversationCrud');
const port = process.env.PORT || 3000; //ebergement


createUser({ email: 'fayce@gmail.coml' }, { password: 'faycel' });
//UpdateUser('6381fb93160d73accb59d1df', { username: 'faycel' });
addConversation('63833e244a54dc8fa453b3ec', '63828f04629963f37bfc932c');


//findOne('6388e49a6f3b0b10350b6533');
//update('6388e49a6f3b0b10350b6533', { topic: 'updated', users: '6381e972cd98f245e2c7123c' });
//JoinedToConference();
//LeaveTheConference();
//deleteId('6388e49a6f3b0b10350b6533');
//deleteAll('');
//findAll('');
//create('topic3', '6381e972cd98f245e2c7123c');
/*
app.use(express.json());
// lancer aplication sur notre port
app.listen(port,() => {console.log(`server lancer sur le port a:http//localhost:${port}`);
//The app.listen() function is used to bind and listen the connections on the specified host and port.

});

*/