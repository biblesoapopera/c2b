import mongoose from 'mongoose'

let schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 180
  },
  hash: {
    type: String,
    required: true,
    maxlength: 255
  }
})

mongoose.model('AudioHash', schema)
