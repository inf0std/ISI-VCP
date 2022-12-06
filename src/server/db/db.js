require("dotenv").config();
const { default: mongoose, connect } = require("mongoose");

connectDb().catch((err) => console.log("db not connected"));

<<<<<<< HEAD
connectDb().catch(err =>console.log('db not connected'));




async function connectDb (){
    await mongoose.connect('mongodb://localhost:27017/seendb');
 //await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true});
console.log('db connect');
};
=======
async function connectDb() {
  await mongoose.connect("mongodb://localhost:27017/seendb");
  //await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true});
  console.log("db connect");
}
>>>>>>> fb248c5acbf2751f4d738288cd7b9d4c68288702


module.exports = {
  connectDb,
};
