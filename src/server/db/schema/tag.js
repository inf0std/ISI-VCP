const mongoose = require('mongoose')
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now
    }
})
const Tag = mongoose.model('Tag', tagSchema)
module.exports = { Tag, tagSchema }