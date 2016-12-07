import mongoose from 'mongoose'
import lang from './lang'

mongoose.Promise = Promise

let schema = new mongoose.Schema({
  lang: {
    type: String,
    required: true,
    validate: val => Object.keys(lang).indexOf(val) !== -1
  },
  number: {
    type: Number,
    required: true,
    unique: true,
    min: 0
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40
  },
  summary: {
    type: String,
    maxlength: 180
  },
  episodes: [{
    number: {
      type: Number,
      required: true,
      unique: true,
      min: 0
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40
    },
    summary: {
      type: String,
      maxlength: 180
    },
    img: {
      type: String,
      required: true,
      maxlength: 180
    }
  }]
})

export default mongoose.model('Series', schema)
