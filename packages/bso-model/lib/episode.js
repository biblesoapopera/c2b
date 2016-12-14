'use strict';

System.register('bso-model/Episode', ['babel-runtime/core-js/object/keys', 'babel-runtime/core-js/promise', 'mongoose', './lang'], function (_export, _context) {
  "use strict";

  var _Object$keys, _Promise, mongoose, lang, audio, content, answer, feedback, questionSlide, schema;

  return {
    setters: [function (_babelRuntimeCoreJsObjectKeys) {
      _Object$keys = _babelRuntimeCoreJsObjectKeys.default;
    }, function (_babelRuntimeCoreJsPromise) {
      _Promise = _babelRuntimeCoreJsPromise.default;
    }, function (_mongoose) {
      mongoose = _mongoose.default;
    }, function (_lang) {
      lang = _lang.default;
    }],
    execute: function () {

      mongoose.Promise = _Promise;

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
      });
      feedback = new mongoose.Schema({
        incorrect: { type: content },
        correct: { type: content },
        complete: { type: content }
      });
      questionSlide = new mongoose.Schema({
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