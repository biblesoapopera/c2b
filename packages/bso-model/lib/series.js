'use strict';

System.register('bso-model/Series', ['babel-runtime/core-js/object/keys', 'babel-runtime/core-js/promise', 'mongoose', './lang'], function (_export, _context) {
  "use strict";

  var _Object$keys, _Promise, mongoose, lang, schema;

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

      schema = new mongoose.Schema({
        lang: {
          type: String,
          required: true,
          validate: function validate(val) {
            return _Object$keys(lang).indexOf(val) !== -1;
          }
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
      });

      _export('default', mongoose.model('Series', schema));
    }
  };
});