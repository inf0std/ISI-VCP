const mongoose = require('mongoose')

const reunionSchema = new mongoose.Schema({
        reunion_Name: {
            type: String,
            default: 'reunion_name',

        },
        reunion_Host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            trim: true,
        } //one to one
        ,
        reunion_moderateur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            trim: true,
        }, //one to one

        Conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
            trim: true,
        }, //one to one

        participantsName: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            trim: true,
        }], // one  to many (one reunion to many participants)

        Date_begin: {
            type: Date,
            default: Date.now
        },

        Duration: {
            type: Number,
            default: 40
        },
        archive: {
            type: Boolean,
            default: false
        },

    }, { timestamps: true, } //date of creation and date of updat);

)

const Reunion = mongoose.model('Reunion', reunionSchema)
module.exports = { Reunion, reunionSchema };