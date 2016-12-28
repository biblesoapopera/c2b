import mongoose from 'mongoose'
import lang from './lang'

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
    type: String,
    maxlength: 200,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  feedback: {
    type: String,
    maxlength: 200
  }
})

let feedback = new mongoose.Schema({
  incorrect: {
    type: String,
    maxlength: 200
  },
  correct: {
    type: String,
    maxlength: 200
  },
  complete: {
    type: String,
    maxlength: 200
  }
})

let questionSlide = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    maxlength: 200
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
  lang: {
    type: String,
    required: true,
    validate: val => Object.keys(lang).indexOf(val) !== -1
  },
  series: {
    type: Number,
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
  audioFiles: [{
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
  }],
  slides: [{
    text: {type: content},
    slider: {type: questionSlide},
    listen: {type: content},
    pick: {type: questionSlide},
    multipick: {type: questionSlide}
  }]
})

mongoose.model('Episode', schema)
