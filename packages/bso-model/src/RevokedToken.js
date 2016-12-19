import mongoose from 'mongoose'

let schema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  exp: {
    type: Number,
    required: true
  }
})

mongoose.model('RevokedToken', schema)
