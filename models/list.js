const mongoose = require('mongoose')

const schema = mongoose.Schema

const ListSchema = new schema({
    listName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    items: {
        type: [String],
        required: false
    }
}, {versionKey: false})

const list = mongoose.model('List', ListSchema)
module.exports = list