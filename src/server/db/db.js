<<<<<<< HEAD
//veillez definir les parametres necessaire pour vous requete
// file containing the CRUD API

//create operation
createUser = ()=>{ }
createConversation = ()=>{ }
createOrganization = ()=>{ }
createReunion = ()=>{ }
createConference = ()=>{ }
createDebate = ()=>{ }

//Read operations
readUser = ()=> { }
readConversation = ()=> { }
readOrganization = ()=> { }
readReunion = ()=> { }
readConference = ()=> { }
readDebate = ()=> { }

//update operation
updateUser = ()=> { }
updateConversation = ()=> { }
updateOrganization = ()=> { }
updateReunion = ()=> { }
updateConference = ()=> { }
updateDebate = ()=> { }

//delete operation
deleteUser = ()=> { }
deleteConversation = ()=> { }
deleteOrganization = ()=> { }
deleteReunion = ()=> { }
deleteConference = ()=> { }
deletedebate = ()=> { }
=======
require("dotenv").config();
const { default: mongoose, connect } = require("mongoose");

connectDb().catch((err) => console.log("db not connected"));

//connectDb().catch(err =>console.log('db not connected'));




async function connectDb() {
    await mongoose.connect('mongodb://localhost:27017/seendb');
    //await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true});
    console.log('db connect');
};


module.exports = {
    connectDb,
};
>>>>>>> db
