'use strict';

System.register('bso-model/Episode', ['babel-runtime/core-js/object/keys', 'mongoose', './lang'], function (_export, _context) {
  "use strict";

  var _Object$keys, mongoose, lang, audio, content, answer, feedback, questionSlide, schema;

  return {
    setters: [function (_babelRuntimeCoreJsObjectKeys) {
      _Object$keys = _babelRuntimeCoreJsObjectKeys.default;
    }, function (_mongoose) {
      mongoose = _mongoose.default;
    }, function (_lang) {
      lang = _lang.default;
    }],
    execute: function () {
      audio = new mongoose.Schema({
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
      });
      content = new mongoose.Schema({
        text: {
          type: String,
          required: true,
          maxlength: 500
        },
        audio: audio
      });
      answer = new mongoose.Schema({
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
      });
      feedback = new mongoose.Schema({
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
      });
      questionSlide = new mongoose.Schema({
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
          validate: function validate(val) {
            return ['always', 'correct', 'first-attempt', 'second-attempt'].indexOf(val) !== -1;
          }
        },
        feedback: { type: feedback }
      });
      schema = new mongoose.Schema({
        lang: {
          type: String,
          required: true,
          validate: function validate(val) {
            return _Object$keys(lang).indexOf(val) !== -1;
          }
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
        primaryAudio: {
          type: String,
          minlength: 3,
          maxlength: 180
        },
        slides: [{
          text: { type: content },
          slider: { type: questionSlide },
          listen: { type: content },
          pick: { type: questionSlide },
          multipick: { type: questionSlide }
        }]
      });


      mongoose.model('Episode', schema);
    }
  };
});