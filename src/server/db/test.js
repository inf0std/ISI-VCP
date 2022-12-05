const { connectDb } = require("./db.js");
const express = require("express");
const app = express();
const {
    createUser,
    readoneUser,
    UpdateLogin,
    UpdateUser,
    archiveUser,
    deleteUser,
    addContact,
} = require("./crudUtils/userCrud");
const { createConference, readConferenceAll, readConference, updateConference, deleteConference, deleteConferenceAll, JoinedToConference, LeaveTheConference, getUserProgrammedEvents } = require("./crudUtils/conferenceCrud")
const port = process.env.PORT || 3000; //ebergement

//createUser({ email: 'fayce@gmail.coml' }, { password: 'faycel' });
//UpdateUser('6381fb93160d73accb59d1df', { username: 'faycel' });
//addContact('6381fb9316gpçj793accb59d1df', '6381fb93160dsçf73accb59d1df');

//findOne('6388e49a6f3b0b10350b6533');
//update('6388e49a6f3b0b10350b6533', { topic: 'updated', users: '6381e972cd98f245e2c7123c' });
//JoinedToConference();
//LeaveTheConference();
//deleteId('6388e49a6f3b0b10350b6533');
//deleteAll('');
//findAll('');
//create('topic5', ['6381f1bbb4004ae1baeded2b', '6381f17bc098eb1596fcef0c', '6381f5fe4621a0ede3ca7409'], 120);
/*
app.use(express.json());
// lancer aplication sur notre port
app.listen(port,() => {console.log(`server lancer sur le port a:http//localhost:${port}`);
//The app.listen() function is used to bind and listen the connections on the specified host and port.

});

*/