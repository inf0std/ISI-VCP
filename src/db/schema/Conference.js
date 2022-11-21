const { default: mongoose } = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;


const ConferenceSchema = new Schema({
   
});



module.exports = mongoose.model('Conference',ConferenceSchema);
