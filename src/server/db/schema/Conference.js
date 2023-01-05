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
        trim: true,
        required: true
    },
    videocall: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        leaveAt: { type: Date },
        joinedAt: { type: Date }
    }],
    archive: {
        type: Boolean,
        default: false
    },
    Date_begin: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number,
        default: 40
    },
    missed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


const Conference = mongoose.model('Conference', conferenceSchema)
module.exports = { Conference, conferenceSchema };