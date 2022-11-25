const mongoose = require('mongoose')

const conferSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true,
        joined: { type: Boolean, default: false },
    }],
    organisedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    videocall: [{
        users: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            trim: true,
        },
        joinedAt: {
            type: Date,
        },

    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true })

const Confer = mongoose.model('Confer', conferSchema)
module.exports = { Confer, conferSchema };