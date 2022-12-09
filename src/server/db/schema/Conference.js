const mongoose = require('mongoose')

const conferenceSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true,
    }],
    organisedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    videocall: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
    }],
    archive: {
        type: Boolean,
        default: false
    },
    Date_begin: {
        type: Date
    },
    duration: {
        type: Number
    },
    missed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


const Conference = mongoose.model('Conference', conferenceSchema)
module.exports = { Conference, conferenceSchema };