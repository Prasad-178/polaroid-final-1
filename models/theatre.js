const mongoose = require('mongoose')

const schema = mongoose.Schema
const defaultSeating =[
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

const theatreSchema = new schema({
  location: {
    type: String,
    required: true
  },
  movieName: {
    type: String,
    required: true
  },
  timing: {
    type: String,
    required: true
  },
  seating: {
    type: [[Number]],
    required: true,
    default: defaultSeating
  }
}, {versionKey: false})

const theatre = mongoose.model('Theatre', theatreSchema)
module.exports = theatre