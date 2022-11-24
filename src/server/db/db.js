require('dotenv').config();
const { default: mongoose, connect } = require('mongoose');


connectDb().catch(err =>console.log('db not connected'));




async function connectDb (){

 await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true});
console.log('db connect');
};

module.exports = {

    connectDb

}