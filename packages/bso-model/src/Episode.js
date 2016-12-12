import mongoose from 'mongoose'
import lang from './lang'

mongoose.Promise = Promise

let audio = new mongoose.Schema({
  file: {
    type: String,
    maxlength: 180
  },
  start: {
    type: Number,
    required: true,
    min: 0
  },
  end: {
    type: Number,
    required: true,
    min: 0
  }
})

let content = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 500
  },
  audio: audio
})

let answer = new mongoose.Schema({
  value: {
    type: content,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  feedback: {
    type: content
  }
})

let feedback = new mongoose.Schema({
  incorrect: {type: content},
  correct: {type: content},
  complete: {type: content}
})

let questionSlide = new mongoose.Schema({
  question: {
    type: content,
    required: true
  },
  answers: [answer],
  audio: audio,
  completeWhen: {
    type: String,
    required: true,
    maxlength: 50,
    validate: val => ['always', 'correct', 'first-attempt', 'second-attempt'].indexOf(val) !== -1
  },
  feedback: {type: feedback}
})

let schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    min: 0
  },
  lang: {
    type: String,
    required: true,
    validate: val => Object.keys(lang).indexOf(val) !== -1
  },
  series: {
    type: Number,
    required: true,
    unique: true,
    min: 0
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
  img: {
    type: String,
    required: true,
    maxlength: 180
  },
  audioFiles: {
    type: Array,
    required: true,
    validate: val => val.length >= 1
  },
  slides: [{
    text: {type: content},
    slider: {type: questionSlide},
    listen: {type: content},
    pick: {type: questionSlide},
    multipick: {type: questionSlide}
  }]
})

mongoose.model('Episode', schema)
