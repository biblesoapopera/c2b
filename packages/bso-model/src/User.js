import mongoose from 'mongoose'
import role from './role'
import country from './country'
import lang from './lang'

let schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 120,
    minlength: 4
  },
  password: {
    type: String,
    required: true,
    maxlength: 120,
    minlength: 8
  },
  loginVersion: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  name: {
    type: String,
    maxlength: 120,
    minlength: 3
  },
  roles: {
    type: Array,
    default: ['guest'],
    validate: val => val.every(v => role.indexOf(v) !== -1)
  },
  country: {
    type: String,
    default: 'au',
    validate: val => Object.keys(country).indexOf(val) !== -1
  },
  lang: {
    type: String,
    default: 'en',
    validate: val => Object.keys(lang).indexOf(val) !== -1
  }
})

mongoose.model('User', schema)
